// Servidor MCP: gera imagens com a API de imagens da OpenAI (gpt-image).
// Requer a variável de ambiente OPENAI_API_KEY.
// Modelo padrão: gpt-image-1 (sobrescreva com GPT_IMAGE_MODEL ou pelo parâmetro `model`).

import { McpServer } from '@modelcontextprotocol/sdk/server/mcp.js'
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js'
import { z } from 'zod'
import fs from 'node:fs'
import path from 'node:path'

const DEFAULT_MODEL = process.env.GPT_IMAGE_MODEL || 'gpt-image-1'
const DEFAULT_OUT_DIR = process.env.GPT_IMAGE_OUT_DIR || path.resolve(process.cwd(), 'generated-images')

const server = new McpServer({ name: 'gpt-image', version: '1.0.0' })

server.tool(
  'generate_image',
  'Gera uma imagem com a API de imagens da OpenAI e salva como arquivo PNG local. Retorna o caminho do arquivo salvo.',
  {
    prompt: z.string().describe('Descrição detalhada da imagem desejada (estilo, cores, enquadramento, luz)'),
    file_name: z.string().describe('Nome do arquivo de saída, sem extensão (ex.: "vestido-rubi-1")'),
    size: z.enum(['1024x1024', '1024x1536', '1536x1024', 'auto']).optional()
      .describe('Dimensões da imagem. 1024x1536 = retrato (bom para moda). Padrão: 1024x1536'),
    quality: z.enum(['low', 'medium', 'high', 'auto']).optional()
      .describe('Qualidade/custo da geração. Padrão: medium'),
    out_dir: z.string().optional()
      .describe(`Pasta de destino. Padrão: ${DEFAULT_OUT_DIR}`),
    model: z.string().optional()
      .describe(`Modelo de imagem da OpenAI. Padrão: ${DEFAULT_MODEL}`),
  },
  async ({ prompt, file_name, size, quality, out_dir, model }) => {
    const apiKey = process.env.OPENAI_API_KEY
    if (!apiKey) {
      return {
        isError: true,
        content: [{
          type: 'text',
          text: 'OPENAI_API_KEY não está definida no ambiente. Defina a variável de ambiente no Windows e reinicie o Claude Code.',
        }],
      }
    }

    const body = {
      model: model || DEFAULT_MODEL,
      prompt,
      n: 1,
      size: size || '1024x1536',
      quality: quality || 'medium',
    }

    const res = await fetch('https://api.openai.com/v1/images/generations', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify(body),
    })

    if (!res.ok) {
      const errText = await res.text().catch(() => '')
      return {
        isError: true,
        content: [{
          type: 'text',
          text: `Erro da API da OpenAI (HTTP ${res.status}): ${errText.slice(0, 800)}`,
        }],
      }
    }

    const data = await res.json()
    const b64 = data?.data?.[0]?.b64_json
    if (!b64) {
      return {
        isError: true,
        content: [{ type: 'text', text: `Resposta sem imagem: ${JSON.stringify(data).slice(0, 500)}` }],
      }
    }

    const dir = out_dir ? path.resolve(out_dir) : DEFAULT_OUT_DIR
    fs.mkdirSync(dir, { recursive: true })
    const safeName = file_name.replace(/[^a-zA-Z0-9-_]/g, '-')
    const filePath = path.join(dir, `${safeName}.png`)
    fs.writeFileSync(filePath, Buffer.from(b64, 'base64'))

    const usage = data.usage ? ` | tokens: ${JSON.stringify(data.usage)}` : ''
    return {
      content: [{
        type: 'text',
        text: `Imagem salva em: ${filePath} (modelo ${body.model}, ${body.size}, ${body.quality})${usage}`,
      }],
    }
  },
)

const transport = new StdioServerTransport()
await server.connect(transport)
