import Link, { LinkProps } from "next/link";
import { useRouter } from "next/router";

interface ActiveLinkProps extends LinkProps {
  children: string;
  activeClassName: string;
}

export function ActiveLinkView({
  children,
  activeClassName,
  ...props
}: ActiveLinkProps) {
  const { asPath } = useRouter();

  const className = asPath === props.href ? activeClassName : "";

  return (
    <Link {...props} className={className}>
      {children}
    </Link>
  );
}
