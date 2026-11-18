export default function WordmarkEditorial({ className = '', size = 'nav' }) {
  return (
    <span
      className={[
        'zk-mark zk-mark--editorial',
        size === 'display' ? 'zk-mark--display' : size === 'lg' ? 'zk-mark--lg' : '',
        className,
      ].join(' ')}
    >
      <span className="zk-mark__line">Zulfe Khaas</span>
      <svg className="zk-mark__swash" viewBox="0 0 300 14" aria-hidden="true" focusable="false">
        <path
          d="M3 10.4C48 5.2 96 3.6 148 6.2C200 8.8 248 9.4 286 4.6"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path d="M292 3.2l3.4 3.4-3.4 3.4-3.4-3.4z" fill="currentColor" />
      </svg>
    </span>
  )
}
