import React from 'react';
import { Button, Result } from 'antd';
import { Link } from 'react-router-dom';

type NotFoundPageProps = {
  subTitle?: string;
  isBackButton?: boolean;
};

export const NotFoundPage = ({
  subTitle = 'Sorry, the page you visited does not exist.',
  isBackButton = true,
}: NotFoundPageProps) => (
  <Result
    status="404"
    title="404"
    subTitle={subTitle}
    extra={
      isBackButton && (
        <Link to="/">
          <Button type="primary">Back Home</Button>
        </Link>
      )
    }
  />
);
