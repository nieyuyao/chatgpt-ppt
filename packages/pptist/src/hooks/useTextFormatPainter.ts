import { storeToRefs } from 'pinia'
import { useMainStore } from '@/store'

export default () => {
  const mainStore = useMainStore()
  const { richTextAttrs, textFormatPainter } = storeToRefs(mainStore)

  const toggleFormatPainter = () => {
    if (textFormatPainter.value) mainStore.setTextFormatPainter(null)
    else {
      mainStore.setTextFormatPainter({
        bold: richTextAttrs.value.bold,
        em: richTextAttrs.value.em,
        underline: richTextAttrs.value.underline,
        strikethrough: richTextAttrs.value.strikethrough,
        color: richTextAttrs.value.color,
        backcolor: richTextAttrs.value.backcolor,
        fontname: richTextAttrs.value.fontname,
        fontsize: richTextAttrs.value.fontsize,
        align: richTextAttrs.value.align,
      })
    }
  }

  return {
    toggleFormatPainter,
  }
}
