import { View, StyleSheet, FlatList } from "react-native";
import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Card,
  Dialog,
  FAB,
  Portal,
  Snackbar,
  Text,
  TextInput,
} from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";
import { black } from "react-native-paper/lib/typescript/styles/themes/v2/colors";
import { Strings } from "@/constants/strings";
import { formatRupiah } from "@/utils/scripts";

export default function BarangViewPage() {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);

  const [visibleSnackbar, setVisibleSnackbar] = React.useState(false);

  const showSnackbar = () => setVisibleSnackbar(true);

  const hideSnackbar = () => setVisibleSnackbar(false);

  // buat react hook (useState)
  const [data, setData] = useState<
    { id: number; kode: string; name: string; harga: number; satuan: string }[]
  >([]);

  // state untuk pencarian
  const [search, setSearch] = useState("");
  // state untuk filter data (hasil pencarian)
  const [filter, setFilter] = useState<typeof data>([]);
  // state untuk simpan id barang
  const [id, setId] = useState(0);

  // buat useRef untuk menampilkan pesan hapus data
  const message = useRef("");
  // buat useRef untuk menampilkan pesan hapus data
  const messageResponse = useRef("");

  // buat react hook (useEffect)
  useEffect(() => {
    getDataBarang();

    // jika pencarian data di isi
    if (search.toLowerCase().trim() !== "") {
      // lakukan pencarian dan filter data
      // berdasarkan nama barang / harga barang
      const filter_data = data.filter((item) => {
        // filter nama dengan mengabaikan spasi
        const nama = item.name.replace(/\s+/g, "").toLowerCase();
        // filter harga dengan tanpa mengabaikan spasi
        const harga = String(item.harga).replace(/\/s+/g, ".").toLowerCase();
        // proses filter data
        return (
          nama.includes(search.replace(/\s+/g, "").toLowerCase()) ||
          harga.includes(search.replace(/\/s+/g, ".").toLowerCase())
        );
      });
      // tampilkan data berdasarkan pencarian
      setFilter(filter_data);
    }
    // jika pencarian data tidak di isi
    else {
      // tampilkan seluruh data barang
      setFilter(data);
    }
  }, [search, data]);

  // buat fungsi koneksi API dengan axios
  const getDataBarang = async () => {
    const response = await axios.get(Strings.api_barang);
    // console.log(response.data.barang);
    setData(response.data.barang);
  };

  // buat pesan untuk hapus data
  const setMessage = (text: string) => {
    message.current = "Data Barang:" + text + "ingin dihapus ?";
  };

  // buat fungsi untuk hapus data
    
  const deleteDataBarang = async (id: number) => {
    try {

      const response = await axios.delete(
        `${Strings.api_barang}/${id}`
      );
      messageResponse.current = response.data.message;
      setVisibleSnackbar(true);
    }
    finally {
      hideDialog();
    }
  };

    // tampilkan respon (message)
    // console.log(response.data.message);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "flex-start",
        // width: "100%",
        // alignItems: "center",
        // backgroundColor: "#ffcc00",
      }}
      // style={{ flex: 1, alignItems: "flex-end", justifyContent: "flex-end" }}
    >
      {/* ini contoh inline */}
      {/* css inline menggunakan tambahan {} */}
      {/* <Text style={{color: 'green', textAlign: 'center', fontSize: 20}}>Halaman View Barang</Text> */}

      {/* ini contoh internal */}
      {/* gunakan kurung [] untuk menggabungkan style lebih dari 1 */}

      {/* area header */}
      <Text style={[styles.warna_bg, styles.jarak, { textAlign: "center" }]}>
        Halaman View Barangg
      </Text> 

      {/* area pencarian */}
      <TextInput
        label="Cari Data Barang"
        right={
          <TextInput.Icon
            icon={() => (
              <MaterialIcons
                name="search"
                size={24}
                color="black"
                onPress={() => console.log("Pressed")}
              />
            )}
          />
        }
        style={{ backgroundColor: "#fff", margin: 30, fontSize: 16 }}
        value={search}
        onChangeText={(text) => setSearch(text)}
      />

      {/* area content */}
      {/* {data.map((Item) => ( */}
      <FlatList
        style={{ backgroundColor: "#a31c31" }}
        data={filter}
        keyExtractor={(item) => String(item.id)}
        renderItem={({ item }) => (
          <Card key={item.id} style={styles.Card}>
            <Card.Title
              title={item.name}
              subtitle={formatRupiah(item.harga)}
              titleStyle={{ fontSize: 20 }}
            />
            <Card.Actions>
              <Button
                onPress={() => {
                  setId(item.id);
                  showDialog();
                  setMessage(item.name);
                }}
                style={{ backgroundColor: "white" }}
              >
                <MaterialIcons
                  name="delete"
                  size={24}
                  color="black"
                ></MaterialIcons>
              </Button>
              <Button onPress={() => console.log("edit")}>
                <MaterialIcons
                  name="edit"
                  size={24}
                  color="black"
                ></MaterialIcons>
              </Button>
            </Card.Actions>
          </Card>
        )}
      />
      {/* </Text> */}

      {/* Area FAB */}
      <FAB
        icon="plus"
        color="#fff"
        mode="flat"
        style={styles.fab}
        onPress={() => console.log("Pressed")}
      />

      <Portal>
        <Dialog visible={visible} onDismiss={hideDialog}>
          <Dialog.Title>Konfirmasi</Dialog.Title>
          <Dialog.Content>
            <Text variant="bodyMedium">{message.current}</Text>
          </Dialog.Content>
          <Dialog.Actions>
            <Button onPress={hideDialog}>Batal</Button>
            <Button
              onPress={() => {
                deleteDataBarang(id);
              }}
            >
              Hapus
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>

      <Snackbar visible={visibleSnackbar} onDismiss={hideSnackbar}>
        {messageResponse.current}
      </Snackbar>
    </View>
  );
} 

// bagian css (styling)
// untuk satuan menggunakan Dp bukan piksel
const size = 20;
const styles = StyleSheet.create({
  warna_bg: {
    backgroundColor: "#a51c31",
    color: "#ffffff",
    textAlign: "center",
    padding: 10,
    fontSize: size,
  },
  jarak: {
    paddingVertical: 10,
    paddingHorizontal: 10,
  },

  fab: {
    position: "absolute",
    margin: 15,
    right: 0,
    bottom: 0,
    backgroundColor: "#a51c31",
  },

  Card: {
    margin: 20,
  },
});
