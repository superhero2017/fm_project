/* eslint-disable no-unused-vars */
import React from 'react'
import PropTypes from 'prop-types'
import { Link, Route, Switch, } from 'react-router-dom'
import {
  Button as UIButton,
  Container as UIContainer,
  Grid as UIGrid,
  Header as UIHeader,
  Label as UILabel,
  Segment as UISegment,
} from 'semantic-ui-react'

import { isMobile } from '../lib/responsive'
import { getCookPageBannerPhoto, routerBecomeChefPath, } from '../urls'
import withAccessControl from '../hocs/withAccessControl'

import MealPage from '../containers/MealPage'
import MealsDisplay from '../containers/MealsDisplay'
import MenuBar from '../containers/MenuBar'
import NewMealPage from '../containers/NewMealPage'
import PublicProfile from '../containers/PublicProfile'

import ControlPanelPage from '../components/ControlPanelPage'
import Footer from '../components/Footer'
import Masthead from '../components/Masthead'
import VerticalStep from '../components/VerticalStep'


const CookPage = () => {

  const mainHeaderSize = isMobile() ? "30px" : "40px"
  return (
    <div style={{width: "100%"}}>
      <Masthead height="550px" photo={getCookPageBannerPhoto()}>
        <div style={{margin: "0 5% 0 5%"}}>
          <UIGrid stackable>
            <UIGrid.Row stretched>
              <UIGrid.Column width="8">
                <UISegment padded className='green-bg'
                  style={{
                    padding: "40px", textAlign: "left",
                    fontWeight: "normal"
                  }
                }>
                  <h1 style={{color: "white", fontSize: mainHeaderSize}}>
                    Help make the world a more delicious place
                  </h1>
                  <h4>
                    Make money while sharing your unique cooking talents with your friends and communities
                  </h4>
                  <UIButton
                    color="orange"
                    size="big"
                    as={Link}
                    to={routerBecomeChefPath()}
                  >
                    Start Cooking
                  </UIButton>
                </UISegment>
              </UIGrid.Column>
            </UIGrid.Row>
          </UIGrid>
        </div>
      </Masthead>
      <UIContainer style={{margin: "30px 30% 30px 30%"}}>
        <UIHeader size="huge" style={{textAlign: "center"}}>
          How it Works
        </UIHeader >
        <UIGrid>
          <UIGrid.Row>
            <UIGrid.Column>
              <VerticalStep number="1" title="Register to become a chef">
                <UIGrid stackable>
                  <UIGrid.Row>
                    <UIGrid.Column width="12">
                      <UIContainer>
                        {"In order to start cooking, we'll need some information from you."}
                        <br />
                        {"We'll also ask you to take a brief quiz that shows you know how to safely handle food."}
                      </UIContainer>
                    </UIGrid.Column>
                    <UIGrid.Column width="4" textAlign="center">
                      <UIButton
                        color="orange"
                        as={Link}
                        to={routerBecomeChefPath()}
                      >
                        Register Now
                      </UIButton>
                    </UIGrid.Column>
                  </UIGrid.Row>
                </UIGrid>
              </VerticalStep>
            </UIGrid.Column>
          </UIGrid.Row>

          <UIGrid.Row>
            <UIGrid.Column>
              <VerticalStep number="2" title="Post your first meal">
                <UIGrid stackable>
                  <UIGrid.Row>
                    <UIGrid.Column width="12">
                      <UIContainer>
                        {"List your favorite dish to start cooking. You set the price, the date, and the ingredients."}
                        <br />
                        {"People will search for your meal and if they like it, they'll sign up and pay for it ahead of time."}
                        <br />
                        <br />
                        {"You can choose how far in advance you'd like people to sign up for your meal. \
                         This way you'll know exactly how much food to prepare."}
                      </UIContainer>
                    </UIGrid.Column>
                    <UIGrid.Column width="4" textAlign="center">
                      <UIButton
                        color="orange"
                        as={Link}
                        to="/"
                        disabled
                      >
                        Learn More
                      </UIButton>
                    </UIGrid.Column>
                  </UIGrid.Row>
                </UIGrid>
              </VerticalStep>
            </UIGrid.Column>
          </UIGrid.Row>

          <UIGrid.Row>
            <UIGrid.Column>
              <VerticalStep number="3" title="Cook and deliver your meal">
                <UIGrid stackable>
                  <UIGrid.Row>
                    <UIGrid.Column width="12">
                      <UIContainer>
                        {"Cook your meal and package it up to deliver at the time you specified."}
                        <br />
                        <br />
                        {"You'll either deliver the food to them, they'll come to you to pick it up, or you can host them at your house for a 'pop up restaurant' experince."}
                        <br />
                        {"You can choose these options when you initially post the meal, \
                        and you'll work out the details with your customers after they buy it."}
                      </UIContainer>
                    </UIGrid.Column>
                    <UIGrid.Column width="4" textAlign="center">
                    </UIGrid.Column>
                  </UIGrid.Row>
                </UIGrid>
              </VerticalStep>
            </UIGrid.Column>
          </UIGrid.Row>

          <UIGrid.Row>
            <UIGrid.Column>
              <VerticalStep number="4" title="Leave reviews and get paid!">
                <UIGrid stackable>
                  <UIGrid.Row>
                    <UIGrid.Column width="12">
                      <UIContainer>
                        {"After you drop off the meal, \
                        the money will be released into your account. \
                        You can leave reviews for each other, \
                        and get ready to cook again!"}
                      </UIContainer>
                    </UIGrid.Column>
                    <UIGrid.Column width="4" textAlign="center">
                    </UIGrid.Column>
                  </UIGrid.Row>
                </UIGrid>
              </VerticalStep>
            </UIGrid.Column>
          </UIGrid.Row>

          <UIGrid.Row>
            <UIGrid.Column>

              <UIGrid stackable>
                <UIGrid.Row stretched>
                  <UIGrid.Column width="6" />
                  <UIGrid.Column width="10">
                    <UISegment padded className='green-bg'
                      style={{
                        padding: "40px", textAlign: "left",
                        fontWeight: "normal"
                      }
                    }>
                      <h1 style={{color: "white", fontSize: "40px"}}>
                        Get ready to start cooking today!
                      </h1>
                      <UIButton
                        color="orange"
                        size="big"
                        as={Link}
                        to={routerBecomeChefPath()}
                      >
                        Become a Chef
                      </UIButton>
                    </UISegment>
                  </UIGrid.Column>
                </UIGrid.Row>
              </UIGrid>

            </UIGrid.Column>
          </UIGrid.Row>
        </UIGrid>
      </UIContainer>
    </div>
  )
}

export default CookPage
