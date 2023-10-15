import goodsMask from '@/assets/img/img-goods-mask.png'
import type { OpenGroupItem } from '@/types'
import { blobToBase64, canvasToBlob } from '@daysnap/utils'

export async function generatorGoodsImage(
  options: {
    ProductModelImageUrl: string
    OpenGroupId: number
    Price1: string
    Price2: string
    SubTitle: string
    Specification: string
  },
  openGroups: OpenGroupItem[],
) {
  const { ProductModelImageUrl, OpenGroupId, Price1, Price2, SubTitle, Specification } = options
  if (!ProductModelImageUrl) {
    return ''
  }
  const GroupDate = openGroups.find((item) => item.Id === OpenGroupId)?.GroupDate ?? ''
  console.log('xxx => ', OpenGroupId, GroupDate)
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')!
  const width = (canvas.width = 750)
  // const height = (canvas.height = 750)
  const height = (canvas.height = 600)

  const [cover, mask] = await Promise.all([
    getImageInfo(ProductModelImageUrl),
    getImageInfo(goodsMask),
  ])

  const setStep = (fn: any) => {
    ctx.save()
    fn && fn()
    ctx.restore()
  }

  // 清空画布
  ctx.clearRect(0, 0, width, height)

  // 绘制底色
  setStep(() => {
    ctx.fillStyle = '#ffffff'
    ctx.fillRect(0, 0, width, height)
  })

  // 绘制图
  setStep(() => {
    // 商品图
    ctx.drawImage(cover, 0, 0, width, height)
    // 遮罩
    ctx.drawImage(mask, 0, mask.height - height, width, height, 0, 0, width, height)
  })

  // 开团时间
  if (GroupDate) {
    setStep(() => {
      ctx.fillStyle = '#ffffff'
      ctx.font = `500 24px Arial`
      ctx.fillText(`开团时间：${GroupDate}`, 24, 655 - 150)
    })
  }

  // 小标题
  if (SubTitle) {
    setStep(() => {
      ctx.fillStyle = '#ffffff'
      ctx.font = `500 32px Arial`
      ctx.fillText(`${SubTitle}`, 24, 708 - 150)
    })
  }

  // 规格说明
  if (Specification) {
    setStep(() => {
      ctx.fillStyle = 'rgba(255,255,255,0.85)'
      ctx.font = `20px Arial`
      ctx.fillText(`${Specification}`, 24, 738 - 150)
    })
  }

  // 价格1
  if (Price1) {
    drawCenterText(
      ctx,
      [
        { text: `¥`, font: `bold 28`, color: `#ffffff`, offset: 16 },
        { text: `${Price1}`, font: `bold 72`, color: `#ffffff` },
      ],
      width - 150,
      690 - 150,
    )
  }

  // 价格2
  if (Price2) {
    drawRoundRect(ctx, 476, 702 - 150, 250, 32, 16, '#ffffff')
    drawCenterText(
      ctx,
      [
        { text: `新加坡币:`, font: `24`, color: `#F23030`, offset: 16 },
        { text: `${Price2}`, font: `bold 24`, color: `#F23030` },
      ],
      width - 150,
      690 + 36 - 150,
    )
  }

  const blob = await canvasToBlob(canvas, 'image/jpeg')

  return blobToBase64(blob)
}

function getImageInfo(src: string) {
  return new Promise<HTMLImageElement>((resolve, reject) => {
    const image = new Image()
    image.onload = () => {
      resolve(image)
    }
    image.crossOrigin = ''
    image.onerror = reject
    image.src = src
  })
}

// 绘制长串文案
function drawCenterText(
  ctx: CanvasRenderingContext2D,
  list: {
    text: string
    font: string
    color: string
    offset?: number
  }[],
  w: number,
  h: number,
) {
  ctx.save()
  ctx.textBaseline = 'alphabetic'
  let width = 0
  list
    .map((item) => {
      // eslint-disable-next-line prefer-const
      let { font, text, offset = 0 } = item
      text = `${text}`
      ctx.font = `${font}px Arial`
      const { width: itemWidth } = ctx.measureText(text)
      width = width + itemWidth + offset
      return Object.assign({ itemWidth }, item)
    })
    .forEach((item) => {
      // eslint-disable-next-line prefer-const
      let { font, color, text, itemWidth = 0, offset = 0 } = item
      text = `${text}`
      ctx.font = `${font}px Arial`
      ctx.fillStyle = color
      ctx.fillText(text, w - width / 2, h)
      w = w + itemWidth + offset
    })
  ctx.restore()
}

function drawText(
  ctx: CanvasRenderingContext2D,
  list: {
    text: string
    font: string
    color: string
    offset?: number
  }[],
  w: number,
  h: number,
) {
  ctx.save()
  ctx.textBaseline = 'alphabetic'
  list.forEach((item) => {
    // eslint-disable-next-line prefer-const
    let { font, color, text, offset = 0 } = item
    text = `${text}`
    ctx.font = `${font}px Arial`
    // ctx.setFontSize(font)
    ctx.fillStyle = color
    ctx.fillText(text, w, h)
    w = w + ctx.measureText(text).width + offset
  })
  ctx.restore()
}

// 绘制圆角矩形
function drawRoundRect(
  ctx: CanvasRenderingContext2D,
  x: number,
  y: number,
  w: number,
  h: number,
  r: number,
  config: any,
) {
  let color = config && config.color ? config.color : 'transparent'
  if (typeof config === 'string') {
    color = config
  }
  ctx.save()
  // 开始绘制
  ctx.beginPath()
  // 因为边缘描边存在锯齿，最好指定使用 transparent 填充
  if (config.type) {
    if (config.type === 'fill') {
      ctx.fillStyle = config.fillColor || 'transparent'
    } else if (config.type === 'stroke') {
      ctx.fillStyle = config.strokeColor || 'transparent'
    } else if (config.type === 'both') {
      ctx.fillStyle = config.fillColor || 'transparent'
      ctx.fillStyle = config.strokeColor || 'transparent'
    }
  } else {
    ctx.fillStyle = color
  }
  if (!config.round || config.round.leftTop) {
    // 绘制左上角圆弧
    ctx.arc(x + r, y + r, r, Math.PI, Math.PI * 1.5)
    // 绘制border-top
    ctx.moveTo(x + r, y)
  } else {
    // 绘制border-top
    ctx.moveTo(x, y + r)
    ctx.lineTo(x, y)
    ctx.lineTo(x + r, y)
  }
  ctx.lineTo(x + w - r, y)
  if (!config.round || config.round.rightTop) {
    // 绘制右上角圆弧
    ctx.arc(x + w - r, y + r, r, Math.PI * 1.5, Math.PI * 2)
  } else {
    ctx.lineTo(x + w - r, y)
    ctx.lineTo(x + w, y)
    ctx.lineTo(x + w, y + r)
  }
  // 绘制border-right
  ctx.lineTo(x + w, y + h - r)
  if (!config.round || config.round.rightBottom) {
    // 绘制右下角圆弧
    ctx.arc(x + w - r, y + h - r, r, 0, Math.PI * 0.5)
  } else {
    ctx.lineTo(x + w, y + h - r)
    ctx.lineTo(x + w, y + h)
    ctx.lineTo(x + w - r, y + h)
  }
  // 绘制border-bottom
  ctx.lineTo(x + r, y + h)
  if (!config.round || config.round.leftBottom) {
    // 绘制左下角圆弧
    ctx.arc(x + r, y + h - r, r, Math.PI * 0.5, Math.PI)
  } else {
    ctx.lineTo(x + r, y + h)
    ctx.lineTo(x, y + h)
    ctx.lineTo(x, y + h - r)
  }
  // 绘制border-left
  ctx.lineTo(x, y + r)

  if (config.type) {
    if (config.type === 'fill') {
      ctx.fill()
    } else if (config.type === 'stroke') {
      ctx.stroke()
    } else if (config.type === 'both') {
      ctx.stroke()
      ctx.fill()
    }
  } else {
    ctx.fill()
  }

  ctx.closePath()
  // 剪切
  ctx.clip()
  ctx.restore()
}
