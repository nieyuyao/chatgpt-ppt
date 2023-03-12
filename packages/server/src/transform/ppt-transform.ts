import { nanoid } from 'nanoid'
import { Slide, PPTElement } from '../types/slide'

const titleReg = /#\s*(.*)\n/m
const coverReg = /\={4}Cover\={4}\n/gm
const contentsReg = /\={4}Contents\={4}\n/gm
const pageReg = /\={4}Page\={4}\n/gm

const createTextElement = (text: string, top: number): PPTElement => {
  const id = nanoid(8)
  return {
    type: 'text',
    id,
    left: 240,
    top,
    width: 800,
    height: 50,
    content:
      `<p style="text-align: left;">${text}</p>`,
    rotate: 0,
    defaultFontName: 'Microsoft Yahei',
    defaultColor: '#333',
    vertical: false,
  }
}

// 封面
const createCoverSlide = (title: string, slideId: string): Slide => {
  return {
    id: slideId,
    elements: [
      {
        type: 'shape',
        id: nanoid(8),
        left: 0,
        top: 200,
        width: 546,
        height: 362.5,
        viewBox: [200, 200],
        path: 'M 0 0 L 0 200 L 200 200 Z',
        fill: '#5b9bd5',
        fixedRatio: false,
        opacity: 0.7,
        rotate: 0,
      },
      {
        type: 'shape',
        id: nanoid(8),
        left: 0,
        top: 0,
        width: 300,
        height: 320,
        viewBox: [200, 200],
        path: 'M 0 0 L 0 200 L 200 200 Z',
        fill: '#5b9bd5',
        fixedRatio: false,
        flipV: true,
        rotate: 0,
      },
      {
        type: 'text',
        id: nanoid(8),
        left: 355,
        top: 65.25,
        width: 585,
        height: 188,
        lineHeight: 1.2,
        content: `<p><strong><span style=\'font-size: 72px\'>${title}</span></strong></p>`,
        rotate: 0,
        defaultFontName: 'Microsoft Yahei',
        defaultColor: '#333',
      },
      {
        type: 'line',
        id: nanoid(8),
        left: 361,
        top: 238,
        start: [0, 0],
        end: [549, 0],
        points: ['', ''],
        color: '#5b9bd5',
        style: 'solid',
        width: 2,
      },
    ],
    background: {
      type: 'solid',
      color: '#ffffff',
    },
  }
}

// 目录页
const createContentsSlide = (contents: string, slideId: string): Slide => {
  const list = contents.split('\n')
  const listElements = list.map((text, i) => {
    text = text.replace(/[0-9][\.,，、]/, '')
    return createTextElement(`${i + 1}.${text}`, 140 + i * 40)
  })
  return {
    id: slideId,
    elements: [
      {
        type: 'text',
        id: nanoid(8),
        left: 20,
        top: 200,
        width: 200,
        height: 77,
        lineHeight: 1.2,
        content: '<p style=\'text-align: center;\'><strong><span style=\'font-size: 36px\'>Contents</span></strong></p>',
        rotate: 0,
        defaultFontName: 'Microsoft Yahei',
        defaultColor: '#333',
      },
      {
        type: 'shape',
        id: nanoid(8),
        left: -27,
        top: 432,
        width: 1056,
        height: 162,
        viewBox: [200, 200],
        path: 'M 0 20 C 40 -40 60 60 100 20 C 140 -40 160 60 200 20 L 200 180 C 140 240 160 140 100 180 C 40 240 60 140 0 180 L 0 20 Z',
        fill: '#5b9bd5',
        fixedRatio: false,
        rotate: 0,
      },
      ...listElements
    ],
    background: {
      type: 'solid',
      color: '#fff',
    },
  }
}

const addLinkToContents = (contentsSlide: Slide) => {
  // TODO:
}

// 内容页
const createPageSlide = (
  title: string,
  content: string,
  slideId: string,
): Slide => {
  return {
    id: slideId,
    elements: [
      {
        type: 'text',
        id: nanoid(8),
        left: 145,
        top: 148,
        width: 800,
        height: 77,
        lineHeight: 1.2,
        content: `<p style=\'text-align: center;\'><strong><span style=\'font-size: 36px\'>${title}</span></strong></p>`,
        rotate: 0,
        defaultFontName: 'Microsoft Yahei',
        defaultColor: '#333',
      },
      {
        type: 'text',
        id: nanoid(8),
        left: 207,
        top: 249,
        width: 600,
        height: 56,
        content: `<p style=\'text-align: center;\'><span style=\'font-size: 24px\'>${content}</span></p>`,
        rotate: 0,
        defaultFontName: 'Microsoft Yahei',
        defaultColor: '#333',
      },
      {
        type: 'line',
        id: nanoid(8),
        left: 323,
        top: 238,
        start: [0, 0],
        end: [354, 0],
        points: ['', ''],
        color: '#5b9bd5',
        style: 'solid',
        width: 4,
      },
      {
        type: 'shape',
        id: nanoid(8),
        left: -27,
        top: 432,
        width: 1056,
        height: 162,
        viewBox: [200, 200],
        path: 'M 0 20 C 40 -40 60 60 100 20 C 140 -40 160 60 200 20 L 200 180 C 140 240 160 140 100 180 C 40 240 60 140 0 180 L 0 20 Z',
        fill: '#5b9bd5',
        fixedRatio: false,
        rotate: 0,
      },
    ],
    background: {
      type: 'solid',
      color: '#fff',
    },
  }
}

// 结尾页
const createEndSlide = (slideId: string): Slide => {
  return {
    id: slideId,
    elements: [
      {
        type: 'shape',
        id: nanoid(8),
        left: 183,
        top: 175,
        width: 605,
        height: 185,
        viewBox: [200, 200],
        path: 'M 0 0 L 200 0 L 200 200 L 0 200 Z',
        fill: '#5b9bd5',
        fixedRatio: false,
        rotate: 0,
      },
      {
        type: 'shape',
        id: nanoid(8),
        left: 211,
        top: 201,
        width: 605,
        height: 185,
        viewBox: [200, 200],
        path: 'M 0 0 L 200 0 L 200 200 L 0 200 Z',
        fill: '#5b9bd5',
        fixedRatio: false,
        rotate: 0,
        opacity: 0.7,
      },
      {
        type: 'text',
        id: nanoid(8),
        left: 120,
        top: 198,
        width: 800,
        height: 140,
        content:
          "<p style='text-align: center;'><strong><span style='color: #ffffff;'><span style='font-size: 80px'>THANKS</span></span></strong></p>",
        rotate: 0,
        defaultFontName: 'Microsoft Yahei',
        defaultColor: '#333',
        wordSpace: 5,
      },
    ],
    background: {
      type: 'solid',
      color: '#fff',
    },
  }
}

export const pptTransform = (topic: string, text: string): Slide[] => {
  const slides: Slide[] = []
  text = text.trim()
  const re = /(?<=\n)\n/gm
  let matched = re.exec(text)
  let start = 0
  let idPrefix = 'slide-'
  let id = 1
  const pageSlides: Slide[] = []
  let contentsSlide: Slide | undefined = undefined
  while (matched) {
    const last = re.lastIndex
    let slideStr = text.substring(start - 1, last).trim()
    const sId = `${idPrefix}${id}`
    if (coverReg.test(slideStr)) {
      const title = slideStr.match(titleReg)?.[1] ?? topic
      slides.push(createCoverSlide(title, sId))
    } else if (contentsReg.test(slideStr)) {
      slideStr = slideStr.replace(contentsReg, '')
      contentsSlide = createContentsSlide(slideStr, sId)
    } else if (pageReg.test(slideStr)) {
      slideStr = slideStr.replace(pageReg, '')
      const titleMatched = slideStr.match(titleReg)
      const title = titleMatched?.[1] ? titleMatched[1] : ''
      const content = titleMatched
        ? slideStr.substring(titleMatched?.index ?? 0 + titleMatched[0].length)
        : slideStr
      // @ts-ignore
      pageSlides.push(createPageSlide(title, content, sId))
    }
    matched = re.exec(text)
    start = last + 1
    id++
  }
  if (contentsSlide) {
    slides.push(contentsSlide)
  }
  slides.push(...pageSlides)
  slides.push(createEndSlide(`${idPrefix}${id}`))
  return slides
}
