#. 

## 使用

```sh
npm install

npm run dev

npm run build
```


```vue
<template>
    <div>
        <div class="view-inner poster-inner">
            <img v-if="base64Poster" :src="base64Poster" @load="isPopup = true" alt="海报">
            <button v-if="base64Poster" class="c-button disabled"></button>
        </div>
        <i class="view-return" v-if="base64Poster" @click="$router.replace('/choice')"></i>
        <div class="popup-tips" v-if="isPopup">
            <div class="popup-tips-inner">
                <img src="~src/assets/images/popup-tips-bg.png" alt="提示">
                <i @click="isPopup = false"></i>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                isPopup: false,
                base64Poster: '',
                objData: {
                    '11': require('src/assets/images/1a.jpg'),
                    '12': require('src/assets/images/1b.jpg'),
                    '13': require('src/assets/images/1c.jpg'),

                    '21': require('src/assets/images/2a.jpg'),
                    '22': require('src/assets/images/2b.jpg'),
                    '23': require('src/assets/images/2c.jpg'),

                    '31': require('src/assets/images/3a.jpg'),
                    '32': require('src/assets/images/3b.jpg'),
                    '33': require('src/assets/images/3c.jpg'),
                },
            }
        },
        created() {
            this.createPoster()
        },
        methods: {
            createPoster () {
                const { target, bless } = this.$route.query
                const posterBg = this.objData[`${target}${bless}`]
                this.$api.reqQrCodeInfo().then(res => {
                    return this.$helper.loadAllImages([
                        posterBg,
                        `data:image/png;base64,${res.img}`
                    ])
                }).then(res => {
                    const [bg, qrCode] = res
                    const innerWidth = window.innerWidth
                    const canvas = document.createElement('canvas')
                    const ctx = canvas.getContext('2d')
                    const devicePixelRatio = window.devicePixelRatio || 1
                    const backingStoreRatio = ctx.webkitBackingStorePixelRatio ||
                        ctx.mozBackingStorePixelRatio ||
                        ctx.msBackingStorePixelRatio ||
                        ctx.oBackingStorePixelRatio ||
                        ctx.backingStorePixelRatio || 1
                    const ratio = devicePixelRatio / backingStoreRatio
                    const rpx = innerWidth < 750 ? innerWidth / 750 : 1
                    canvas.width = 750 * rpx * ratio
                    canvas.height = 1334 * rpx * ratio
                    ctx.scale(ratio, ratio)

                    // 绘制背景
                    ctx.save()
                    ctx.drawImage(bg, 0, 0, bg.width * rpx, bg.height * rpx)
                    ctx.restore()

                    // 绘制二维码
                    ctx.save()
                    ctx.drawImage(qrCode, 172 * rpx, 971 * rpx, 105 * rpx, 105 * rpx)
                    ctx.restore()

                    // // 绘制文字
                    ctx.save()
                    ctx.fillStyle = '#624794'
                    ctx.textBaseline = 'hanging' // 在绘制文本时使用的当前文本基线
                    ctx.font = 'normal 12px 微软雅黑' // 设置字体
                    ctx.fillText(`扫码关注`, 306 * rpx, 978 * rpx) // 设置文本内容
                    ctx.font = 'normal bold 12px 微软雅黑' // 设置字体
                    ctx.fillText(`为好友助力`, 408 * rpx, 978 * rpx) // 设置文本内容
                    ctx.fillText(`助TA瓜分`, 306 * rpx, 1012 * rpx) // 设置文本内容
                    ctx.font = 'normal bold 13px 微软雅黑' // 设置字体
                    ctx.fillText(`价值1万元的中秋健康礼包`, 306 * rpx, 1050 * rpx) // 设置文本内容
                    ctx.restore()

                    return canvas.toDataURL()
                }).then(res => {
                    this.base64Poster = res
                }).toast()
            }
        },
    }
</script>

<style lang="scss" scoped>
    @import "src/assets/scss/define";
    .poster-inner{
        img{
            @extend %db;
            @extend %w100;
            height: auto;
        }
        .c-button{
            @extend %pa;
            @extend %l50;
            top: j(1110);
            margin-left: j(-459 / 2);
            width: j(459);
            border-radius: j(41);
            height: j(81);
            background: url("~src/assets/images/btn-6.jpg") no-repeat;
            background-size: cover;
            pointer-events: none;
        }
    }
    .popup-tips{
        @extend %pf;
        @extend %t0;
        @extend %l0;
        @extend %w100;
        @extend %h100;
        @extend %df;
        @extend %aic;
        @extend %jcc;
        z-index: 9;
        background-color: rgba(0, 0, 0, .7);
        animation: fadeIn .5s;
    }
    .popup-tips-inner{
        @extend %pr;
        width: j(450);
        height: j(545);
        img{
            @extend %db;
            @extend %w100;
            @extend %h100;
        }
        i{
            @extend %pa;
            @extend %t0;
            @extend %r0;
            @extend %cp;
            width: j(100);
            height: j(100);
        }
    }
    .view-return{
        @extend %pf;
        top: j(20);
        left: j(20);
        width: j(105);
        height: j(49);
        background: url("~src/assets/images/return-icon.png") no-repeat;
        background-size: cover;
    }
    @keyframes fadeIn {
        from {
            opacity: 0;
        }
        to {
            opacity: 1;
        }
    }
</style>
```