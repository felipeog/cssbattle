import { BATTLES_MAP } from '../consts/battlesMap'

export default {
  targetId: 'target015',
  title: 'Target #15 - Overlap',
  url: 'https://cssbattle.dev/play/15',
  solution:
    '<a a><a b><a c><style>body,a[c]{background:#09042A}a{position:fixed;width:150;height:150;border-radius:50%;top:75}a[a]{background:#E78481;right:75}a[b],a[c]{left:75}a[b]{background:#7B3F61}a[c]{clip-path:circle(75px at 175px center)}</style>',
  battle: BATTLES_MAP['battle002'],
}
