import '@/global.less';

// 如果不需要在生命周期中操作, 可以将其删除然后重新运行
// 微应用被挂载
export async function mount(props: Record<string, unknown>) {
  // eslint-disable-next-line no-console
  console.log('mount', props);
}
// 微应用被卸载
export async function unmount(props: Record<string, unknown>) {
  // eslint-disable-next-line no-console
  console.log('unmount', props);
}
