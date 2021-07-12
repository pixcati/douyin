export default {
  $notice(val) {
    let div = document.createElement('div')
    div.classList.add('global-notice')
    div.textContent = val
    document.body.append(div)
    setTimeout(() => {
      document.body.removeChild(div)
    }, 1000)
  },
  $back() {
    window.history.back()
  },
  $stopPropagation(e) {
    e.stopImmediatePropagation()
    e.stopPropagation()
    e.preventDefault()
  },
  $getCss(curEle, attr) {
    let val = null, reg = null
    if ("getComputedStyle" in window) {
      val = window.getComputedStyle(curEle, null)[attr]
    } else {   //ie6~8不支持上面属性
      //不兼容
      if (attr === "opacity") {
        val = curEle.currentStyle["filter"]   //'alpha(opacity=12,345)'
        reg = /^alphaopacity=(\d+(?:\.\d+)?)opacity=(\d+(?:\.\d+)?)$/i
        val = reg.test(val) ? reg.exec(val)[1] / 100 : 1
      } else {
        val = curEle.currentStyle[attr]
      }
    }
    // reg = /^(-?\d+(\.\d)?)(px|pt|em|rem)?$/i
    // return reg.test(val) ? parseFloat(val) : val
    return parseFloat(val)
  },
  $setCss(el, key, value) {
    if (key === 'transform') {
      //直接设置不生效
      el.style.webkitTransform = el.style.MsTransform = el.style.msTransform = el.style.MozTransform = el.style.OTransform = el.style.transform = value;
    } else {
      el.style[key] = value
    }
  },
  $nav(path, query = {}) {
    this.$router.push({path, query})
  },
  $clone(v) {
    return JSON.parse(JSON.stringify(v))
  },
  $console(v) {
    return console.log(JSON.stringify(v, null, 4))
  },
  $duration(v) {
    let m = Math.floor(v / 60)
    // let s = v % 60
    let s = Math.round(v % 60)
    let str = ''
    if (m === 0) {
      str = '00'
    } else if (m > 0 && m < 10) {
      str = '0' + m
    } else {
      str = m
    }
    str += ':'
    if (s === 0) {
      str += '00'
    } else if (s > 0 && s < 10) {
      str += '0' + s
    } else {
      str += s
    }
    return str
  }
}