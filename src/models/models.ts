export {}

export interface childrenProps {
  children: React.ReactNode
}

export interface contactType {
  id: string
  name: string
}

export interface conversationsType {
  messages: string[] | []
  recipients: string[]
}
