import React, { useEffect } from "react";
import "./Main.css";
import aboutAsImg from "../assets/imgForAboutUsOne.jpg";
import specialists from "../assets/specialists.svg";
import acii from "../assets/acii.svg";
import krasota from "../assets/krasota.svg";
import card from "../assets/card.svg";
import location from "../assets/location.svg";
import { useAppSelector } from "../store/hooks";
import { Button } from "@mantine/core";
import { Link } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";

const MainPage = () => {
  const { isAuth } = useAppSelector((state) => state.user);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, []);

  return (
    <MainLayout>
      <div className="about__us">
        <div className="post__one">
          <div className="text1">
            <p>Приглашаем в наш салон красоты</p>
            <p>
              Мы создаем красоту, предоставляя качественные услуги в дружелюбной
              обстановке по доступным ценам. Мы строим одну из лучших сетей
              салонов красоты в России, успех которой основан на доверии,
              честности и гармонии в команде.
              <br />
              <br />
              {isAuth ? (
                <Button color={"orange"} component={Link} to={"/events"}>
                  Записаться на услугу
                </Button>
              ) : (
                <b>Чтобы записаться на услугу необходимо зарегистрироваться.</b>
              )}
            </p>
          </div>
          <img src={aboutAsImg} width="800px" alt="" />
        </div>

        <div className="price__list">
          <p>У нас</p>
          <div className="price__list__ul">
            <div className="price__list__item">
              <img src={specialists} alt="" />
              <p>Лучшие специалисты</p>
            </div>
            <div className="price__list__item">
              <img src={acii} alt="" />
              <p>скидки и акции</p>
            </div>
            <div className="price__list__item">
              <img src={krasota} alt="" />
              <p>красота и комфорт</p>
            </div>
            <div className="price__list__item">
              <img src={card} alt="" />
              <p>доступные цены</p>
            </div>
            <div className="price__list__item">
              <img src={location} alt="" />
              <p>удобное расположение</p>
            </div>
          </div>
        </div>
      </div>
      <div id="aboutUs" className="about">
        <div className="about__us__text">
          <p>О НАС</p>
          <p>
            Мы хотели сделать невозможное — предоставить качественный сервис
            каждому, чтобы любой человек, вне зависимости от своего достатка,
            возраста, вкусовых предпочтений, смог получить качественную услугу и
            стать еще счастливее.
            <br />
            <br />
            Студия63 — это не только салонные парикмахерские услуги. В нашем
            арсенале имеются косметологические процедуры, аппаратные технологии,
            массажи различных видов, SPA, а также команда профессиональных
            стилистов.
          </p>
        </div>
      </div>
    </MainLayout>
  );
};

export default MainPage;
