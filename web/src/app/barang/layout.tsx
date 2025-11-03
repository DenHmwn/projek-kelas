import React from 'react'
import Image from 'next/image';
import styles from './barang.module.css'

export default function BarangLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div>
    <div>{children}</div>
    </div>
  )
}
