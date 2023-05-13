import React from "react";
import backgroundMenu from "../assets/backgroundMenu.jpg";
import "./Menu.css";
import nogti from "../assets/nogti.png";
import brovki from "../assets/brovki.png";
import resn from "../assets/resn.png";
import depil from "../assets/depil.png";
import Studio63 from "../assets/Studio63.jpg";
import Header from "../components/Header";
import Footer from "../components/Footer";
import { Link } from "react-router-dom";

const MenuPage = () => {
  return (
    <div>
      <Header />
      <div>
        <div id="Menu" className="welcome">
          <img src={backgroundMenu} alt="" />
          <p>Мы позаботимся о вашей красоте!</p>
        </div>
        <div id="about" className="about__us">
          <h1>
            Добро пожаловать в Студию63 - самый креативный салон красоты в
            городе Уфа
          </h1>
          <div className="description">
            <img src={Studio63} width="400px" alt="" />
            <p>
              У нас есть все для комплексного, а значит самого эффективного
              ухода за самыми хрупкими и в тоже время самыми заметными гранями
              вашей привлекательности. Если чувствуешь, что нуждаешься в
              обновлении не только внешнем, но и внутреннем - тогда спешите к
              нам в салон! Но мы не просто очередной салон красоты, мы Бьюти-бар
              - здесь одни из самых лучших и квалифицированных специалистов
              собраны в одном месте. Мы готовы предоставить полный спектр услуг,
              и ты можешь подготовить себя к любому значимому мероприятию. Здесь
              ты «свой», здесь нет дискомфорта, все как дома, уют и тепло🌹
              Радуй себя и своё тело ❤ Ну а мы ждём тебя.
            </p>
          </div>
        </div>
        <div
          id="services"
          style={{ paddingTop: "10px" }}
          className="our__services"
        >
          <p>Наши услуги</p>
          <div className="services__wrapper">
            <div className="service_one">
              <Link to={"/Services#depil"}>
                <img src={resn} alt="" />
              </Link>
              <p>Ресницы. Особенные техники наращивания</p>
            </div>

            <div className="service_two">
              <Link to={"/Services#cosmet"}>
                <img src={depil} alt="" />
              </Link>
              <p>Педикюр, уход за вашим ножками.</p>
            </div>
            <div className="service_three">
              <Link to={"/Services#brovi"}>
                <img src={brovki} alt="" />
              </Link>
              <p>Оформление и окрашивание бровей.</p>
            </div>
            <div className="service_four">
              <Link to={"/Services#manik"}>
                <img src={nogti} alt="" />
              </Link>
              <p>Маникюр. Услуга в четыре руки</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MenuPage;
