import React from 'react';
import { Card, CardContent, CardFooter, CardHeader } from './ui/card';

interface CardSectionProps {
  header?: React.ReactElement;
  content: React.ReactElement;
  footer: React.ReactElement;
  headerClass?: string;
  contentClass?: string;
  footerClass?: string;
}

const CardSection = (props: CardSectionProps) => {
  const { header, content, footer, headerClass, contentClass, footerClass } = props;
  return (
    <Card>
      {header && <CardHeader className={headerClass}>{header}</CardHeader>}
      {content && <CardContent className={contentClass}>{content}</CardContent>}
      {footer && <CardFooter className={footerClass}>{footer}</CardFooter>}
    </Card>
  );
};

export default CardSection;
