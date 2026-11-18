export default function WordmarkBodoni({ className = '', size = 'nav' }) {
  return (
    <span
      className={[
        'zk-mark zk-mark--bodoni',
        size === 'display' ? 'zk-mark--display' : size === 'lg' ? 'zk-mark--lg' : '',
        className,
      ].join(' ')}
    >
      <span className="zk-mark__line">Zulfe Khaas</span>
    </span>
  )
}
