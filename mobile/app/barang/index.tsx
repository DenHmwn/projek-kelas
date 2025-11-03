import { View, Text, StyleSheet } from "react-native";
import React, { useEffect, useState } from "react";
import { FAB, TextInput } from "react-native-paper";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import axios from "axios";
import { get } from "react-native/Libraries/TurboModule/TurboModuleRegistry";
import { Item } from "react-native-paper/lib/typescript/components/Drawer/Drawer";

export default function BarangViewPage() {
  // buat react hook (useState)
  const [data, setData] = useState<{id: number; kode: string; name: string; harga: String; satuan: string;}[]>([])

  // buat react hook (useEffect)
  useEffect(() => {
    getDataBarang();
  });

  
  // buat fungsi koneksi API dengan axios
  const getDataBarang = async () => {
    const response = await axios.get("http://10.0.2.2:3001/api/barang");
    // console.log(response.data.barang);
    setData(response.data.barang);
  };
  

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
      />

      {/* area content */}
      <Text>{data.map((Item) => (
        <Text key={Item.id}>{[Item.kode, Item.name, Item.harga]}</Text>
      ))}</Text>


      {/* Area FAB */}
      <FAB
        icon="plus"
        color="#fff"
        mode="flat"
        style={styles.fab}
        onPress={() => console.log("Pressed")}
      />
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
});
