"use client";

import React from "react";
import styles from "../barang.module.css";
import useSWR from "swr";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

// Interface untuk model barang
interface ModelBarang {
  id: number;
  kode: string;
  name: string;
  harga: number;
  satuan: string;
}

// Fungsi fetcher untuk SWR
const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function ViewBarangPage() {
  // Definisi SWR
  const { data, error, isLoading } = useSWR(
    "http://localhost:3001/api/barang",
    fetcher
  );

  // jika terjadi error
  // if(error) {
  //   return <div>Gagal mengambil data</div>
  // }

  // // proses menunggu pengambilan data API
  // if(isLoading) {
  //   return <div>Mohon Tunggu</div>
  // }

  return (
    <section className={styles.page}>
      {/* Tombol Navigasi */}
      <nav className="mb-4 flex sm:justify-end md:justify-start justify-center">
        <button className="sm:bg-cyan-300 bg-rose-700 px-8 py-2 text-white rounded-full">
          Tambah Data
        </button>
      </nav>

      <article>
        {error ? (
          <div className="text-rose-700">Gagal mengambil data</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[100px]">Aksi</TableHead>
                <TableHead>Kode</TableHead>
                <TableHead>Nama</TableHead>
                <TableHead className="text-right">Harga</TableHead>
                <TableHead>Satuan</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {isLoading ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center">Mohon Tunggu...</TableCell>
                </TableRow>
              ) : (
                data &&
                data.barang.map((item: ModelBarang) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">-</TableCell>
                    <TableCell>{item.kode}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="text-right">{item.harga}</TableCell>
                    <TableCell>{item.satuan}</TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        )}
      </article>
    </section>
  );
}
