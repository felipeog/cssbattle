import { BATTLES_MAP } from '../consts/battlesMap'

export default {
  targetId: 'target012',
  title: 'Target #12 - Wiggly Moustache',
  url: 'https://cssbattle.dev/play/12',
  solution:
    '<a a><a b><a c><style>body{background:#F5D6B4}a{position:fixed;width:60;height:60;border-radius:50%;border:20px solid #D86F45;border-top-color:transparent;border-left-color:transparent;transform:rotate(45deg)}a[a]::after,a[c]::after{content:"";position:absolute;width:20;height:20;background:#D86F45;border-radius:50%}a[a]{top:100;left:70}a[a]::after{top:48;left:-8}a[b]{top:100;left:150;transform:rotate(225deg)}a[c]{top:100;left:230}a[c]::after{top:-8;left:48}</style>',
  battle: BATTLES_MAP['battle001'],
}
