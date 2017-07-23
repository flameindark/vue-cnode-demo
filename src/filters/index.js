import moment from 'moment'

export function transformTab (tab, isTop) {
  if (isTop) {
    return '置顶'
  } else {
    switch (tab) {
      case 'share':
        return '分享'
      case 'ask':
        return '问答'
      case 'job':
        return '招聘'
      case 'good':
        return '精华'
      case 'top':
        return '置顶'
      default: 
        return false
    }
  }
}
moment.locale('zh-cn');
export function transformDateFromNow(date) {
  return moment(date).startOf('day').fromNow();
}

export function transformDate(date) {
  return moment(date).format('YYYY年M月DD日,a h:mm:ss');  
}

