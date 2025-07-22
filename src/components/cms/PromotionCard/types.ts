export interface PromotionCardProps {
  contextualFields: {
    background?: string
    title: string
    description?: string
    link: string
    size?: "large" | "small"
    image?: string
    date?: string
    cta?: string
  }
  type: "image" | "solid"
  title: string
  description?: string
  date?: string
  image?: string
  link: string
  size?: "large" | "small"
	className?: string
}

