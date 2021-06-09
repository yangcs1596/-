export function parseTime(time) {
  if (time) {
    var date = new Date(time)
    var year = date.getFullYear()
    /* 在日期格式中，月份是从0开始的，因此要加0
     * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
     * */
    var month = (date.getMonth() + 1 + '').padStart(2, 0)
    var day = (date.getDate() + '').padStart(2, 0)
    var hours = (date.getHours() + '').padStart(2, 0)
    var minutes = (date.getMinutes() + '').padStart(2, 0)
    var seconds = (date.getSeconds() + '').padStart(2, 0)
    // 拼接
    return year + '-' + month + '-' + day + ' ' + hours + ':' + minutes + ':' + seconds
  } else {
    return ''
  }
}

export function formatTime(time, option) {
  time = +time * 1000
  const d = new Date(time)
  const now = Date.now()

  const diff = (now - d) / 1000

  if (diff < 30) {
    return '刚刚'
  } else if (diff < 3600) {
    // less 1 hour
    return Math.ceil(diff / 60) + '分钟前'
  } else if (diff < 3600 * 24) {
    return Math.ceil(diff / 3600) + '小时前'
  } else if (diff < 3600 * 24 * 2) {
    return '1天前'
  }
  if (option) {
    return parseTime(time, option)
  } else {
    return d.getMonth() + 1 + '月' + d.getDate() + '日' + d.getHours() + '时' + d.getMinutes() + '分'
  }
}

// 其他转为2020-01-02
export function parseTimeByType(time, dataType) {
  //2020-01-02 00:00:00
  if (time && ['2', '3', '4', '5'].includes(dataType)) {
    if (dataType === '2') {
      //全中文日期  二〇二〇年一月二日
      const arr = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
      let temp = ''
      let cur = time.replace(/[年|月]/g, ' ').replace(/日/g, '')
      cur.split(' ').forEach((v, i) => {
        if (i === 0) {
          v.split('').forEach((y) => {
            let index = arr.indexOf(y)
            temp += index + ''
          })
        } else if (i > 0) {
          let dat = v.split('')
          let marr = []
          let i2 = v.indexOf('十')
          dat.forEach((m) => {
            let index = arr.indexOf(m)
            marr.push(index)
          })
          if (i2 === -1) {
            temp += '-' + marr[0]
          } else if (i2 === 0) {
            temp += '-' + (marr[0] + marr[1])
          } else if (i2 === 1) {
            temp += '-' + (marr[0] * marr[1] + marr[2])
          }
          marr = []
        }
      })
      return temp
    } else if (dataType === '3') {
      //英文日期  Jan 02 2020
      return parseTime(time)
    } else if (dataType === '4') {
      //中文数字日期  2020年12月12日
      return time.replace(/[年|月]/g, '-').replace(/[日]/g, ' ')
    } else if (dataType === '5') {
      //年月日时分秒  2020年4月13日15时8分20秒
      return time.replace(/[年|月]/g, '-').replace(/[日|秒]/g, ' ').replace(/[时|分]/g, ':')
    }
    return ''
  } else {
    return ''
  }
}

//转化为对应格式的的日期
export function formatTimeByType(time, dataType) {
  //2020-01-02 00:00:00
  if (time && ['1', '2', '3', '4', '5'].includes(dataType)) {
    if (dataType === '2') {
      //全中文日期  二〇二〇年一月二日
      let temp = time.split(' ')[0].split('-')
      let date = ''
      const arr = ['〇', '一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
      temp.forEach((v, i) => {
        if (i === 0) {
          v.split('').forEach((y) => {
            date += arr[y]
          })
          date += '年'
        } else {
          if (v < 10) {
            date += arr[parseInt([v])]
          } else {
            let n = Math.floor(v / 10)
            let m = v - n * 10
            date += n > 1 ? arr[n] + '十' + arr[m] : '十' + arr[m]
          }
          date += i === 1 ? '月' : '日'
        }
      })
      return date
    } else if (dataType === '3') {
      //英文日期  Jan 02 2020
      let temp = new Date(time).toString()
      return temp.split(' ').splice(1, 3).join(' ')
    } else if (dataType === '4') {
      //中文数字日期  2020年12月12日
      let d = new Date(time)
      return d.getFullYear() + '年' + (d.getMonth() + 1) + '月' + d.getDate() + '日'
    } else if (dataType === '5') {
      //年月日时分秒  2020年4月13日15时8分20秒
      let d = new Date(time)
      return (
        d.getFullYear() +
        '年' +
        (d.getMonth() + 1) +
        '月' +
        d.getDate() +
        '日' +
        d.getHours() +
        '时' +
        d.getMinutes() +
        '分' +
        d.getSeconds() +
        '秒'
      )
    } else if (dataType === '1') {
      let d = new Date(time)
      return d.getFullYear() + '-' + (d.getMonth() + 1) + '-' + d.getDate()
    }
    return ''
  } else {
    return ''
  }
}
