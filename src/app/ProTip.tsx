import * as React from 'react';
    import Link from '@mui/material/Link';
    import Typography from '@mui/material/Typography';
    import { SvgIconProps } from '@mui/material/SvgIcon';

    function LightBulbIcon(props: SvgIconProps) {
      return (
        <svg
          {...props}
          xmlns="http://www.w3.org/2000/svg"
          width="1em"
          height="1em"
          viewBox="0 0 24 24"
        >
          <path
            fill="currentColor"
            d="M9 21c0 .5.4 1 1 1h4c.6 0 1-.5 1-1v-1H9v1zm3-19C8.1 2 5 5.1 5 9c0 2.4 1.2 4.5 3 5.7V17c0 .5.4 1 1 1h6c.6 0 1-.5 1-1v-2.3c1.8-1.3 3-3.4 3-5.7c0-3.9-3.1-7-7-7zm2.8 10.8l-.8.6v.6H10v-.6l-.8-.6C8.4 12.2 8 11.7 8 11c0-1.7 1.3-3 3-3s3 1.3 3 3c0 .7-.4 1.2-1.2 1.8z"
          />
        </svg>
      );
    }

    export default function ProTip() {
      return (
        <Typography sx={{ mt: 6, mb: 3 }} color="text.secondary">
          <LightBulbIcon sx={{ mr: 1, verticalAlign: 'middle' }} />
          Pro tip: See more{' '}
          <Link href="https://mui.com/getting-started/templates/">
            templates
          </Link>{' '}
          on the MUI documentation.
        </Typography>
      );
    }
