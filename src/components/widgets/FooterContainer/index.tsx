
import React from 'react';
import { FooterContainerProps } from './types';
import { cn } from '@/lib/utils';

const FooterContainer: React.FC<FooterContainerProps> = (props) => {
  const { children, __typename, Id } = props

  const gridAreasLg = `lg:[grid-template-areas:'Logo_Logo_Logo_Logo_Logo_Logo''LinkList1_LinkList2_LinkList3_LinkList4_Subscribe_Subscribe''SocialLinks_SocialLinks_SocialLinks_SocialLinks_SocialLinks_SocialLinks''SiteMapLinks_SiteMapLinks_SiteMapLinks_SiteMapLinks_SiteMapLinks_SiteMapLinks']`
  const gridAreasMd = `lg:[grid-template-areas:'Content_Content_Content''LinkList1_LinkList2_LinkList3''LinkList4_Subscribe_Subscribe''SocialLinks_SocialLinks_SocialLinks']`

  return (
    <div
      data-component={__typename}
      data-id={Id} 
      className={cn(
        "flex flex-col lg:grid lg:gap-8",
        `${gridAreasMd}`,
        `${gridAreasLg}`,
    )}>
        {children}
    </div>
  )
};

export default FooterContainer;
