import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {
  faGithub,
  faTelegramPlane,
  faTwitter,
  IconDefinition,
} from '@fortawesome/free-brands-svg-icons'
import cx from 'classnames'
import { SizeProp } from '@fortawesome/fontawesome-svg-core'

interface SocialButtonProps
  extends Omit<React.HTMLProps<HTMLAnchorElement>, 'size'> {
  icon: IconDefinition
  size: 'sm' | 'md'
  variant: 'primary' | 'secondary'
}

interface SpecificSocialButtonProps extends Omit<SocialButtonProps, 'icon'> {}

export const SocialButton: React.FC<SocialButtonProps> = ({
  icon,
  className,
  size = 'sm',
  variant = 'primary',
  ...props
}) => {
  const sizeClass = cx({ 'w-9 h-9': size === 'sm', 'w-10 h-10': size === 'md' })
  const variantClass = cx({
    'bg-primary text-dark': variant === 'primary',
    'bg-dark text-primary': variant === 'secondary',
  })

  const iconSize = cx({
    '1x': size === 'sm',
    lg: size === 'md',
  }) as SizeProp

  return (
    <a
      className={cx(
        className,
        sizeClass,
        variantClass,
        'flex items-center justify-center rounded-full'
      )}
      {...props}
    >
      <FontAwesomeIcon icon={icon} size={iconSize} />
    </a>
  )
}

export const TwitterButton: React.FC<SpecificSocialButtonProps> = (props) => (
  <SocialButton
    {...props}
    icon={faTwitter}
    href="https://twitter.com/matiwinnetou"
  />
)

export const TelegramButton: React.FC<SpecificSocialButtonProps> = (props) => (
  <SocialButton
    {...props}
    icon={faTelegramPlane}
    href="https://t.me/freedom_cardano"
  />
)

export const GithubButton: React.FC<SpecificSocialButtonProps> = (props) => (
  <SocialButton
    {...props}
    icon={faGithub}
    href="https://github.com/Cardano-Fans"
  />
)
