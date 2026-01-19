import ogaruDash from '~/assets/ogaru_dash.png';
import { Footer } from '~/components/footer';
import { Image } from '~/components/image';
import {
  ProjectBackground,
  ProjectContainer,
  ProjectHeader,
  ProjectImage,
  ProjectSection,
  ProjectSectionContent,
} from '~/layouts/project';
import { Fragment } from 'react';
import { media } from '~/utils/style';
import { baseMeta } from '~/utils/meta';
import styles from './civix.module.css';

const title = 'CIVIX';
const description =
  'A centralized platform that helps construction businesses manage proformas, purchase orders, delivery notes, and invoices — all in one secure, easy-to-use system. Reduce paperwork. Improve accuracy. Get paid faster.';
const roles = ['Web Development', 'System Architecture'];

export const meta = () => {
  return baseMeta({ title, description, prefix: 'Projects' });
};

export function Civix() {
  return (
    <Fragment>
      <ProjectContainer className="civix">
        <ProjectBackground
          src={ogaruDash}
          srcSet={`${ogaruDash} 1280w, ${ogaruDash} 2560w`}
          width={1280}
          height={800}
          placeholder={ogaruDash}
          opacity={0.8}
        />
        <ProjectHeader
          title={title}
          description={description}
          url="https://gamestack.hamishw.com"
          roles={roles}
        />
        <ProjectSection padding="top">
          <ProjectSectionContent>
            <ProjectImage
              srcSet={`${ogaruDash} 800w, ${ogaruDash} 1920w`}
              width={800}
              height={500}
              placeholder={ogaruDash}
              alt="Civix Dashboard Interface"
              sizes={`(max-width: ${media.mobile}px) 100vw, (max-width: ${media.tablet}px) 90vw, 80vw`}
            />
          </ProjectSectionContent>
        </ProjectSection>
      </ProjectContainer>
      <Footer />
    </Fragment>
  );
}
