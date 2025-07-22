
import React from 'react';
import { BasicLinkProps } from './types';
import Link from 'next/link';
import Icon from '@/components/shared/icons';
import { cn } from '@/lib/utils';

const BasicLink: React.FC<BasicLinkProps> = (props) => {
  const { __typename, Id, Destination, OverrideTitle, Section } = props

  const LinkProps = {
    CustomClass: "",
    IconName: ""
  }

  switch (Section) {
    case "FooterContainer":
      LinkProps.CustomClass = "text-muted hover:underline"
      LinkProps.IconName = "Link"
      break;
    default:
      break;
  }

  return (
    <Link 
      data-component={__typename}
      data-component-id={Id}
      href={Destination?.Value || ""}
      title={OverrideTitle || ""}
      className={cn("flex gap-2 items-center", LinkProps.CustomClass)}
    >
      {OverrideTitle || ""}

      {LinkProps.IconName &&
        <Icon iconName={LinkProps.IconName} />
      }
    </Link>
  );
};

export default BasicLink;
