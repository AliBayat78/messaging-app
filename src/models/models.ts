export interface childrenProps {
  children: React.ReactNode
}

export interface contactType {
  id: string
  name: string
}

export interface conversationsType {
  recipients: { id: string; name: string }[]
  messages: any[]
  selected?: boolean
}
