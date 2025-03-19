import { SvgIconTypeMap } from '@mui/material';
    import { OverridableComponent } from '@mui/material/OverridableComponent';

    export interface MenuItem {
      id: string;
      title: string;
      icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
        muiName: string;
      };
      badge?: number;
      path?: string;
      items?: MenuItem[];
    }
