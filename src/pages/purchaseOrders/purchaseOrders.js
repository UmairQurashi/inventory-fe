import React, { useEffect, useState } from "react";
import api from "../../api/index";
import { Form, Col } from "react-bootstrap";
import { Formik } from "formik";
import * as yup from "yup";
import "./purchaseOrders.css";
const PurchaseOrders = () => {
  const [products, setProducts] = useState([]);
  const [itemname, setItemname] = useState([]);
  const [points, setPoints] = useState([]);

  const [clients, setClients] = useState([])
  const [clientsName, setClientsName] = useState([])

  const schema = yup.object().shape({
    productType: yup.string().required("Enter a valid productType."),
    itemType: yup.string().required("Enter a valid itemType."),
    points: yup.string().required("Enter a valid points."),
  });

  const clientSchema = yup.object().shape({
    client: yup.string().required("Enter a valid client."),
  });

  const getProduct = async (values, resetForm) => {
    try {
      let res = await api.get("/mainproducts");
      setProducts(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getClients = async (values, resetForm) => {
    try {
      let res = await api.get("/clients");
      setClients(res.data);
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    getProduct();
    getClients();

  }, []);

  const handleItemname = async (e, formik) => {
    try {
      formik.handleChange(e);
      let itemNames = e.target.value;
      let res = await api.get(`/points/itempoints/${itemNames}`);
      setPoints(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleProducttype = async (e, formik) => {
    try {
      formik.handleChange(e);
      let product = e.target.value;
      let res = await api.get(`/itemnames/${product}`);
      setItemname(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSelectClient = async (e, formik) => {
    try {
      formik.handleChange(e);
      let client = e.target.value;
      let res = await api.get(`/clients/identifyclients/${client}`);
      setClientsName(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const handleSubmit = async (values, resetForm) => {
    try {
      // let res = await api.post("/users/login", values);
      // loginSuccess(res.data.token, res.data.user);
      // navigate("/");
      // resetForm();
    } catch (error) {
      console.log(error);
    }
  };

  return (<>
    <div className="selectclient_main">
      <Formik
        validationSchema={clientSchema}
        onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
        enableReinitialize
        initialValues={{
          client: "",
        }}
      >
        {(formik) => (
          // Select Client
          <Form onSubmit={formik.handleSubmit}>
            <h5>Select Client</h5>
            <div className="selectclient_dropdown">
              <Form.Group controlId="client" as={Col} hasValidation>
                <Form.Label className="form__label"></Form.Label>
                <Form.Control
                  className="rounded-0"
                  as="select"
                  name="client"
                  placeholder="Select Client"
                  value={formik.values.client}
                  onChange={(e) => handleSelectClient(e, formik)}
                  onBlur={formik.handleBlur}
                  isValid={
                    formik.touched.client && !formik.errors.client
                  }
                  isInvalid={
                    formik.touched.client && formik.errors.client
                  }
                >
                  <option value="" disabled>
                    CHOOSE
                  </option>
                  {clients.map((elem, index) => {
                    return (
                      <option key={index} value={elem._id}>
                        {elem.Name}
                      </option>
                    );
                  })}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.client}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="clientPhoneNumber" as={Col} hasValidation>
                <Form.Label className="form__label"></Form.Label>
                <Form.Control
                  className="rounded-0"
                  disabled
                  name="clientPhoneNumber"
                  placeholder="Phone Number"
                  value={clientsName.PhoneNumber}
                  onBlur={formik.handleBlur}
                  isValid={formik.touched.clientPhoneNumber && !formik.errors.clientPhoneNumber}
                  isInvalid={formik.touched.clientPhoneNumber && formik.errors.clientPhoneNumber}
                >
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.clientPhoneNumber}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="clientemail" as={Col} hasValidation>
                <Form.Label className="form__label"></Form.Label>
                <Form.Control
                  className="rounded-0"
                  disabled
                  name="clientemail"
                  placeholder="E-mail"
                  value={clientsName.email}
                  onBlur={formik.handleBlur}
                  isValid={formik.touched.clientemail && !formik.errors.clientemail}
                  isInvalid={formik.touched.clientemail && formik.errors.clientemail}
                >
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.clientemail}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="clientpincode" as={Col} hasValidation>
                <Form.Label className="form__label"></Form.Label>
                <Form.Control
                  className="rounded-0"
                  disabled
                  name="clientpincode"
                  placeholder="Pin Code"
                  value={clientsName.pinCode}
                  onBlur={formik.handleBlur}
                  isValid={formik.touched.clientpincode && !formik.errors.clientpincode}
                  isInvalid={formik.touched.clientpincode && formik.errors.clientpincode}
                >
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.clientpincode}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Form>
        )}
      </Formik>
    </div>
    <div className="purchaseOrder_main">
      <Formik
        validationSchema={schema}
        onSubmit={(values, { resetForm }) => handleSubmit(values, resetForm)}
        enableReinitialize
        initialValues={{
          productType: "",
          itemType: "",
          points: "",
        }}
      >
        {(formik) => (
          // Create Purchase Order
          <Form onSubmit={formik.handleSubmit}>
            <h5>Create Purchase Order</h5>
            <div className="purchaseOrder_dropdown">
              <Form.Group controlId="productType" as={Col} hasValidation>
                <Form.Label className="form__label"></Form.Label>
                <Form.Control
                  className="rounded-0"
                  as="select"
                  name="productType"
                  placeholder="Select ProductType"
                  value={formik.values.productType}
                  onChange={(e) => handleProducttype(e, formik)}
                  onBlur={formik.handleBlur}
                  isValid={
                    formik.touched.productType && !formik.errors.productType
                  }
                  isInvalid={
                    formik.touched.productType && formik.errors.productType
                  }
                >
                  <option value="" disabled>
                    CHOOSE
                  </option>
                  {products.map((elem, index) => {
                    return (
                      <option key={index} value={elem._id}>
                        {elem.name}
                      </option>
                    );
                  })}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.productType}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="itemName" as={Col} hasValidation>
                <Form.Label className="form__label"></Form.Label>
                <Form.Control
                  className="rounded-0"
                  as="select"
                  name="itemName"
                  placeholder="Select itemName"
                  value={formik.values.itemName}
                  onChange={(e) => handleItemname(e, formik)}
                  onBlur={formik.handleBlur}
                  isValid={formik.touched.itemName && !formik.errors.itemName}
                  isInvalid={formik.touched.itemName && formik.errors.itemName}
                >
                  <option value="" disabled>
                    CHOOSE
                  </option>
                  {itemname.map((elem, index) => {
                    return (
                      <option key={index} value={elem._id}>
                        {elem.name}
                      </option>
                    );
                  })}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.itemType}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="points" as={Col} hasValidation>
                <Form.Label className="form__label"></Form.Label>
                <Form.Control
                  className="rounded-0"
                  as="select"
                  name="points"
                  placeholder="Enter Points"
                  value={formik.values.points}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isValid={formik.touched.points && !formik.errors.points}
                  isInvalid={formik.touched.points && formik.errors.points}
                >
                  <option value="" disabled>
                    CHOOSE
                  </option>
                  {points.map((elem, index) => {
                    return (
                      <option key={index} value={elem.name}>
                        {elem.value}
                      </option>
                    );
                  })}
                </Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.points}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="Length" as={Col} hasValidation>
                <Form.Label className="form__label"></Form.Label>
                <Form.Control
                  className="rounded-0"
                  name="Length"
                  placeholder="Enter Length/Bundles"
                  value={formik.values.Length}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  isValid={formik.touched.Length && !formik.errors.Length}
                  isInvalid={formik.touched.Length && formik.errors.Length}
                ></Form.Control>
                <Form.Control.Feedback type="invalid">
                  {formik.errors.points}
                </Form.Control.Feedback>
              </Form.Group>
            </div>
          </Form>
        )}
      </Formik>
    </div>
  </>
  );
};

export default PurchaseOrders;
