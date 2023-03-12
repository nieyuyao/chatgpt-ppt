import Koa from 'koa'
import * as KoaRouter from '@koa/router'
import * as bodyParser from 'koa-bodyparser'
import { Configuration, OpenAIApi } from 'openai'
import { genPrompTemplate } from './templates/prompt-slides-template'
import { pptTransform } from './transform/ppt-transform'
import { slides as mockedSlides } from './mock/slides'

if (!process.env.OPENAI_API_KEY) {
  throw new Error('Please provide an openai key')
}
console.log(`=====node env is: ${process.env.NODE_ENV}=====`)
console.log(`=====your api key is: ${process.env.OPENAI_API_KEY}=====`)
console.log(`=====your organization is: ${process.env.organization}=====`)

const app = new Koa()
const configuration = new Configuration({
  organization: process.env.organization,
  apiKey: process.env.OPENAI_API_KEY,
})
const openai = new OpenAIApi(configuration)
const router = new KoaRouter()
if (process.env.ROUTER_PREFIX) {
  router.prefix(process.env.ROUTER_PREFIX)
}

// preview ppt
const generatePPT = async (ctx: Koa.Context) => {
  const body = ctx.request.body as any
  const { topic = '' } = body
  if (!topic) {
    ctx.body = {
      errCode: 100,
      errMessage: 'Please input invalid topic',
    }
    return
  }
  const prompt = genPrompTemplate(topic)
  try {
    // if (process.env.NODE_ENV === 'development') {
    //   ctx.body = {
    //     errCode: 0,
    //     slides: mockedSlides
    //   }
    //   return
    // }
    const completion = await openai.createChatCompletion({
      model: 'gpt-3.5-turbo',
      messages: [{ role: 'user', content: prompt }],
      max_tokens: 2048,
    })
    const message = completion.data.choices[0].message
    if (message) {
      console.log(message, '======')
      const slides = pptTransform(topic, message.content)
      ctx.body = {
        errCode: 0,
        slides
      }
      return
    }
    ctx.body = {
      errCode: 101,
      errMessage: 'Failed to transform to ppt',
    }
  } catch (err) {
    console.error(err)
    ctx.body = {
      errCode: 102,
      errMessage: 'Failed to load from Chatgpt',
    }
  }
}

router.post('/generate', generatePPT)

app.use(bodyParser())
app.use(router.routes())
app.listen(process.env.PORT, () =>
  console.log(`server listen ${process.env.PORT}`),
)
