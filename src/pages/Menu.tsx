import React from "react";
import backgroundMenu from "../assets/backgroundMenu.jpg";
import "./Menu.css";
import nogti from "../assets/nogti.png";
import brovki from "../assets/brovki.png";
import cosmet from "../assets/cosmet.png";
import depil from "../assets/depil.png";
import Studio63 from "../assets/Studio63.jpg";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
              <img src={depil} alt="" />
              <p>Депиляция. Воском и сахаром, Мужская и женская.</p>
            </div>
            <div className="service_two">
              <img src={cosmet} alt="" />
              <p>Профессиональный уход за вашим лицом.</p>
            </div>
            <div className="service_three">
              <img src={brovki} alt="" />
              <p>
                Оформление и окрашивание бровей.
                <br />
                Ламинирование/ботокс и наращивание ресниц
              </p>
            </div>
            <div className="service_four">
              <img src={nogti} alt="" />
              <p>Маникюр, педикюр. Услуга в четыре руки</p>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default MenuPage;
