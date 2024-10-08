import { Image, StyleSheet, Text, View } from "react-native";
import React, { useState } from "react";
import AppButton from "../components/AppButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { API_URL } from '@env';

const DetailsProduct = ({route}) => {

  const { product } = route.params; 
  const [productDetails, setProductDetails] = useState(product);
  const [showDescription, setShowDescription] = useState(true);
  const [quantity, setQuantity] = useState(0); // Ajoutez un état pour gérer la quantité

  const onPressIncreaseQuantity = () => {
    setQuantity(prevQuantity => prevQuantity + 1); // Utilisez setQuantity pour mettre à jour la quantité
  };

  const onPressDecreaseQuantity = () => {
    if (quantity > 0) {
      setQuantity(prevQuantity => prevQuantity - 1);
    }
  };

  const onPressAdd = async () => {
    try {
        const token = await AsyncStorage.getItem('userToken'); // Récupère le token utilisateur
        const productId = productDetails._id; // Utilisez l'ID du produit à partir des détails du produit
        const quantity = quantity; 
        console.log("l'id de produit"+productId);
        const response = await axios.post(`${API_URL}/cart`, {
            productId,
            quantity
        }, {
            headers: {
                Authorization: `Bearer ${token}` // Ajoute le token à l'en-tête
            }
        });
        alert('Produit ajouté au panier:');
        console.log('Produit ajouté au panier:', response.data);
    } catch (error) {
        console.error('Erreur lors de l\'ajout au panier:', error);
    }
};

  const onPressGoToCHeckout = () => {
    console.log("pressed to mi");
  };
  return (
    <View style={styles.container}>
      <Text style={styles.panierText}>Product</Text>
      <View style={styles.imageContainer}>
        <Image
          source={{ uri: product.images[0] }}  // Affiche la première image du produit
          style={styles.image} 
        />
      </View>
      <View style={styles.detailsContainer}>
        <Text style={styles.detailsText}>{product.name}</Text>
        <View style={styles.detailsPrice}>
          <Text style={styles.detailsText}>{product.price}€</Text>
          <View style={styles.quantityContainer}>
            <AppButton
              title="-"
              onPress={onPressDecreaseQuantity}
              style={{
                button: {
                  width: 50,
                  height: 40,
                  paddingVertical: 0,
                  paddingHorizontal: 0,
                  backgroundColor: "white",
                },
                text: {
                  color: "black",
                  fontSize: 25,
                  fontWeight: "bold",
                },
              }}
            />

            <Text style={styles.quantity}>{quantity}</Text>
            <AppButton
              title="+"
              onPress={onPressIncreaseQuantity}
              style={{
                button: {
                  width: 50,
                  height: 40,
                  paddingVertical: 0,
                  paddingHorizontal: 0,
                  backgroundColor: "white",
                },
                text: {
                  color: "black",
                  fontSize: 20,
                },
              }}
            />
          </View>
        </View>
        <View style={styles.productDescription}>
          <View style={styles.productDescriptionBtns}>
            <View style={styles.btnsContainer}>
              <AppButton
                onPress={() => setShowDescription(true)}
                title={"Description"}
                style={{
                  button: {
                    backgroundColor: "white",
                    width: "100%",
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                  },
                  text: {
                    color: "black",
                  },
                }}
              />
              <View style={styles.dot} />
            </View>
            <View style={styles.btnsContainer}>
              <AppButton
                onPress={() => setShowDescription(false)}
                title={"Details"}
                style={{
                  button: {
                    backgroundColor: "white",
                    width: "100%",
                    paddingVertical: 5,
                    paddingHorizontal: 5,
                  },
                  text: {
                    color: "black",
                  },
                }}
              />
              <View style={styles.dot} />
            </View>
          </View>
          <View style={styles.productDescriptionText}>
            {showDescription ? (
              <Text>{product.description}</Text>
            ) : (
              <Text>{product.details}</Text>
            )}
          </View>
        </View>
        <View style={styles.actionsBtnContainer}>
          <AppButton
            title="+"
            onPress={onPressAdd}
            style={{
              button: {
                width: 50,
                height: 50,
                paddingVertical: 0,
                paddingHorizontal: 0,
                backgroundColor: "white",
                borderRadius: 24,
                shadowColor: "black",
                shadowOffset: {
                  width: 0,
                  height: 0,
                },
                shadowOpacity: 1,
                shadowRadius: 1,
                elevation: 1, // Add this line for Androidu
              },
              text: {
                color: "black",
                fontSize: 30,
              },
            }}
          />
          <AppButton
            title="Passer la commande"
            onPress={onPressGoToCHeckout}
            style={{
              button: {
                width: "70%",
                backgroundColor: "#64A962",
              },
              text: {
                color: "black",
                fontSize: 20,
                fontWeight: "bold",
              },
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default DetailsProduct;

const styles = StyleSheet.create({
  container: {
    marginTop:30,
    flex: 1,
    alignItems: "center",
    backgroundColor: "white",
  },
  panierText: {
    fontSize: 35,
    color: "green",
    textAlign: "center",
  },
  imageContainer: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    overflow: 'hidden',
    marginTop:30,
    marginBottom:10,
  },
  image: {
    width: '100%',
    height: '100%',
    resizeMode: 'contain',
  },
  detailsContainer: {
    flex: 1,
    width: "100%",
  },
  detailsText: {
    fontSize: 20,
    color: "green",
    textAlign: "center",
  },
  detailsPrice: {
    width: "100%",
    alignItems: "center",
    justifyContent: "space-between",
    flexDirection: "row",
    padding: 16,
  },
  quantityContainer: {
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
    gap: 5,
    backgroundColor: "white",
    borderRadius: 25,
    overflow: "hidden",
    shadowColor: "black",
    shadowOffset: {
      width: 0,
      height: 0,
    },
    shadowOpacity: 1,
    shadowRadius: 1,
    elevation: 1, // Add this line for Android
  },
  quantity: {
    fontSize: 16,
    fontWeight: "bold",
  },
  productDescription: {},
  productDescriptionBtns: {
    width: "100%",
    flexDirection: "row",
    marginLeft: 5,
    gap: 5,
  },
  productDescriptionText: {
    margin: 5,
  },
  btnsContainer: {
    alignItems: "center",
    flexDirection: "column",
    width: "33%",
  },
  dot: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "green",
    marginTop: 8,
  },
  actionsBtnContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
});
