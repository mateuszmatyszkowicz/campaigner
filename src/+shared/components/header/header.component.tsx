interface HeaderProps {
    title: string;
}

export const Header = ({ title }: HeaderProps) => {
    return <div className={'px-6 py-3'}>{title}</div>
}