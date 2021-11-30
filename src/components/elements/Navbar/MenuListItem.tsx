import React from "react";
import Link from 'next/link'
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { MenuItem } from "../../../../types/menu";
import Image from 'next/image';
import { useRouter } from 'next/router';

const MenuListItem: React.FC<MenuItem> = ({ title, to, id, imgUrl, imgUrlActive }) => {
  const router = useRouter();
  const pathName = router.pathname;
  const selected = pathName === to;

  return (
    <>
    <Link href={to} passHref key={`${title}_${id}`}>
      <ListItem button component="a" selected={selected}>
        <ListItemIcon>
          <Image 
            src={selected ? imgUrlActive: imgUrl }
            height={15}
            width={15}
            alt={title}
          />
        </ListItemIcon>
        <ListItemText primary={title} />
      </ListItem>
    </Link>
    </>
  )
}
export default MenuListItem;