import { StatusBar } from "expo-status-bar";
import React, { useState, useEffect } from "react";
import {
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  Alert,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import "react-native-gesture-handler";
import { NavigationContainer, StackActions } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { AntDesign } from "@expo/vector-icons";
//import * as ImagePicker from 'expo-image-picker'
//import * as Permissions from 'expo-permissions'
function PostScreen({ navigation }) {
  const [Nombre, setNombre] = useState("");
  const [Password, setPassword] = useState("");
  function Login() {
    //AGREGO EN BASE DE DATOS
    fetch("http://localhost:3000/user", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Nombre: Nombre,
        Password: Password,
      }),
    })
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
        //console.log(typeof(res),res.length);
        if (res.length == 2) {
          alert("Usuario o contraseña no existen");
        } else {
          alert("Te haz logueado exitosamente");
          navigation.navigate("Bienvenidos");
        }

        //window.location.reload();
      })
      .catch((error) => {
        console.log(error);
      });
  }
  return (
    <View style={estilos.container}>
      <Text style={estilos.texto1}>Login</Text>
      <TextInput
        placeholder="Username"
        onChangeText={(n) => setNombre(n)}
        style={estilos.input}
      ></TextInput>
      <TextInput
        placeholder="Password"
        onChangeText={(a) => setPassword(a)}
        style={estilos.input}
      ></TextInput>
      <Button onPress={() => Login()} title="Logueo" />
    </View>
  );
}
const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function RegistroScreen() {
  const [Nombre, setNombre] = useState("");
  const [Password, setPassword] = useState("");
  function Registro() {
    //AGREGO EN BASE DE DATOS
    fetch("http://localhost:3000/registro", {
      method: "post",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        Nombre: Nombre,
        Password: Password,
      }),
    })
      .then((res) => res.text())
      .then((res) => {
        console.log(res);
        alert("Usuario agregado exitosamente");
        //window.location.reload();
      })
      .catch((error) => console.logl(error));
  }
  return (
    <View style={estilos.container}>
      <Text style={estilos.texto1}>Registro</Text>
      <Text style={estilos.texto1}>
        Unicamente cree su usuario y contraseña
      </Text>
      <TextInput
        placeholder="Username"
        onChangeText={(n) => setNombre(n)}
        style={estilos.input}
      ></TextInput>
      <TextInput
        placeholder="Password"
        onChangeText={(a) => setPassword(a)}
        style={estilos.input}
      ></TextInput>
      <Button onPress={() => Registro()} title="Registro" />
    </View>
  );
}


function listado({navigation}) {
  const [categoria, setCategoria] = useState([]);
useEffect(() => {
  fetch("http://localhost:3000/categoria")
    .then((res) => res.json())
    .then((datos) => {
      console.log(datos);
      setCategoria(datos);
    })
    .catch((error) => {
      console.log(error);
      alert("Ocurrio un problema con la conexión");
    });
}, setCategoria);

function Platillos() {
  navigation.navigate("ListarPlatillos");
}
  return (
    <View style={estilos.container}>
      <Text style={estilos.texto1}>Categorias</Text>
      <ScrollView>
        {categoria.map((p) => (
          <TouchableHighlight key={p.CategoriaId} onPress={() => Platillos()}>
            <View>
              <Text style={estilos.texto}> {p.Nombre}</Text>
              <AntDesign name="right" size={23} color="#0a84ff" />
            </View>
          </TouchableHighlight>
        ))}
      </ScrollView>
    </View>
  );
}

function ListadoPlatillos() {

  return (
    <View style={estilos.container}>
      <Text style={estilos.texto1}>Listado de platillos</Text>
    </View>
  );
}
function PantallaDos() {
  return (
    <Tab.Navigator>
      <Tab.Screen name="Crear Usuario" component={RegistroScreen} />
      <Tab.Screen name="Categorias" component={listado} />
        <Tab.Screen name="Crear Platillos" component={listado} />
    </Tab.Navigator>
  );
}
export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Login" component={PostScreen} />
        <Stack.Screen name="Bienvenidos" component={PantallaDos} />
        <Stack.Screen name="ListarPlatillos" component={ListadoPlatillos} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const estilos = StyleSheet.create({
  titulo: {
    fontSize: 50,
  },
  container: {
    flex: 1,
    backgroundColor: "rgba(76, 175, 80, 0.3)",
    alignItems: "center",
    justifyContent: "center",
  },
  texto1: {
    fontSize: 30,
    color: "black",
    fontFamily: "Comic Sans MS, Comic Sans, cursive",
  },
  texto: {
    fontSize: 35,
    color: "blue",
    fontFamily: "Comic Sans MS, Comic Sans, cursive",
  },
  input: {
    backgroundColor: "white",
    borderWidth: 1,
    borderColor: "black",
    alignSelf: "stretch",
    marginLeft: 30,
    marginRight: 30,
    marginTop: 10,
    height: 35,
    fontSize: 25,
  },
  button: {
    borderWidth: 10,
    marginBottom: 30,
    width: 300,
    alignItems: "center",
    backgroundColor: "#2196F3",
  },
  redondo: {
    backgroundColor: "white",
    justifyContent: "center",
    alignContent: "center",
    borderWidth: 3,
    borderRadius: 35,
    width: 40,
    height: 50,
  },
});
