interface HeaderMenuProps {
  title: string
}

export default function HeaderMenu({ title }: HeaderMenuProps) {
  return (
    <div className="p-8">
      <h3 className="text-center text-2xl text-gradient font-bold m-0" style={{ padding: '2rem 0', textAlign: 'center', fontSize: '1.5rem', fontWeight: 800 }}>
        {title}
      </h3>
    </div>
  )
}
