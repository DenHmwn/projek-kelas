"use client";

import React from "react";
import styles from "../barang.module.css";
import useSWR from "swr";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatRupiah } from "@/lib/scripts";
import { Pencil, Trash2 } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import axios from "axios";

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
  const { data, error, isLoading, mutate } = useSWR(
    "http://localhost:3001/api/barang",
    fetcher
  );

  // buat fungsi untuk hapus data
  const deleteData = async (id: number) => {
    await axios.delete(`http://localhost:3001/api/barang/${id}`);
    mutate(data);
  };

  // // jika terjadi error
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

      <article className={styles.content}>
        {error ? (
          <div className="text-red-700 text-center">Gagal mengambil data</div>
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
                  <TableCell colSpan={5} className="text-center">
                    Mohon Tunggu...
                  </TableCell>
                </TableRow>
              ) : (
                data?.barang.map((item: ModelBarang) => (
                  <TableRow key={item.id}>
                    <TableCell className="font-medium">
                      {/* buat tombol edit */}
                      <button className={styles.btn_edit}>
                        <Pencil size={16} />
                      </button>
                      <AlertDialog>
                        <AlertDialogTrigger className={styles.btn_delete}>
                          {/* buagt tombol delete */}
                          <Trash2 size={16} />
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>
                              Konfirmasi Hapus Data Barang
                            </AlertDialogTitle>
                            <AlertDialogDescription>
                              Apakah anda ingin menghapus {item.name} ini?
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Tidak</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => {
                                deleteData(item.id);
                              }}
                            >
                              Y
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </TableCell>
                    <TableCell>{item.kode}</TableCell>
                    <TableCell>{item.name}</TableCell>
                    <TableCell className="text-right">
                      {formatRupiah(item.harga)}
                    </TableCell>
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
