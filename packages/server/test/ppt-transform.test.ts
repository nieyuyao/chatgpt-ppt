import * as fs from 'fs'
import * as path from 'path'
import { pptTransform } from '../src/transform/ppt-transform'


test('transform shell text to ppt', () => {
  const text = fs.readFileSync(path.resolve(__dirname, './chatgpt-ppt-reply.txt'), { encoding: 'utf-8'})
  const slides = pptTransform('学会享受生活',text)
  expect(slides.length).toBe(8)
})
