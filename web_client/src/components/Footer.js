/* eslint-disable no-unused-vars */
import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
import {
  Button as UIButton,
  Container as UIContainer,
  Grid as UIGrid,
  Image as UIImage,
  Header as UIHeader,
  Divider as UIDivider,
  Dropdown as UIDropdown,
  Segment as UISegment,
  List as UIList,
  Icon as UIIcon,
} from 'semantic-ui-react'

import { getDefaultMealImage, getProfilePath,} from '../urls'
import Logo from '../components/Logo'

            // <UIDropdown
            //   text='USD'
            //   placeholder='USD'
            //   selection
            //   fluid
            //   floating
            //   labeled
            //   button
            //   className='icon'
            //   icon='dollar'
            //   options={[{ key: 'usd', value: 'usd', text: 'USD'},]}
            //   defaultValue='USD'
            // />
const Footer = () => {
  return (
    <div className='footer-container'>
      <UISegment inverted className="footer">
        <UIContainer>
          <UIGrid columns='equal'>
            <UIGrid.Column floated='right'>
              <UIList floated='right'>
                <UIList.Header as='h5'>
                  Feedme
                </UIList.Header>
                <UIList.Item>
                  About Us
                </UIList.Item>
                <UIList.Item>
                  Press
                </UIList.Item>
                <UIList.Item>
                  Contact
                </UIList.Item>
              </UIList>
            </UIGrid.Column>
            <UIGrid.Column floated='right'>
              <UIList floated='right'>
                <UIList.Header as='h5'>
                  Eating
                </UIList.Header>
                <UIList.Item>
                  Trust & Safety
                </UIList.Item>
                <UIList.Item>
                  Travel
                </UIList.Item>
                <UIList.Item>
                  Allergies
                </UIList.Item>
              </UIList>
            </UIGrid.Column>
            <UIGrid.Column floated='right'>
              <UIList floated='right'>
                <UIList.Header as='h5'>
                  Cooking
                </UIList.Header>
                <UIList.Item>
                  Why Cook
                </UIList.Item>
                <UIList.Item>
                  Guidelines
                </UIList.Item>
                <UIList.Item>
                  Training
                </UIList.Item>
              </UIList>
            </UIGrid.Column>
          </UIGrid>
        </UIContainer>
      </UISegment>
      <UISegment inverted className="subFooter">
          <UIGrid>
            <UIGrid.Row>
              <UIGrid.Column width='8' verticalAlign='middle'>

                <Logo height="60px" color="white" inline={true} text/>
                <div className='copyright-wrapper-container'>
                  <div className='copyright-wrapper'>
                    <div className='copyright'>
                      © 2017 Feedme Technologies, Inc.
                    </div>
                  </div>
                </div>

              </UIGrid.Column>
              <UIGrid.Column floated='right' width='8'
                textAlign='right' verticalAlign='middle'
              >
                <UIList horizontal className='footer-right'>
                  <UIList.Item>
                    <a href='http://www.feedme.tech/terms-of-service.html'>
                      Terms
                    </a>
                  </UIList.Item>
                  <UIList.Item>
                    <a href='http://www.feedme.tech/privacy-policy.html'>
                      Privacy
                    </a>
                  </UIList.Item>
                  <UIList.Item>
                    <a href='https://www.facebook.com/FeedMe-1984455891810573/'>
                      <UIIcon name='facebook f' />
                    </a>
                  </UIList.Item>
                  <UIList.Item>
                    <a href='https://twitter.com/Official_FeedMe'>
                      <UIIcon name='twitter' />
                    </a>
                  </UIList.Item>
                  <UIList.Item>
                    <a href='https://www.instagram.com/official_feedme/'>
                      <UIIcon name='instagram' />
                    </a>
                  </UIList.Item>
                </UIList>
              </UIGrid.Column>
            </UIGrid.Row>
          </UIGrid>
      </UISegment>
    </div>
  )
}

export default Footer
