import JumpMixin from './jump.mixin'

export default {
  mixins: [JumpMixin],
  monitorViewVolumeSubmit(item) {
    const { api$ } = this.data
    const { Id: ProductId } = item
    this.userGet()
      .then((res) => {
        this.curl(
          api$.DO_MONITOR_VIEW_VOLUME_SUBMIT,
          {
            ProductId,
            OpenId: res.OpenId,
          },
          {
            loading: false,
          },
        ).null()
      })
      .catch(() => {
        this.jumpUserLogin(() => {
          this.monitorViewVolumeSubmit(item)
        }, false)
      })
  },
  monitorShareSubmit(item) {
    const { api$ } = this.data
    const { Id: ProductId } = item
    this.userGet()
      .then((res) => {
        this.curl(
          api$.DO_MONITOR_SHARE_SUBMIT,
          {
            ProductId,
            OpenId: res.OpenId,
          },
          {
            loading: false,
          },
        ).null()
      })
      .catch(() => {
        this.jumpUserLogin(() => {
          this.monitorViewVolumeSubmit(item)
        }, false)
      })
  },
}
