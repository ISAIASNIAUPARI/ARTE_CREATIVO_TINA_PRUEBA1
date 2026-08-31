export function gql(strings, ...args) {
  let str = "";
  strings.forEach((string, i) => {
    str += string + (args[i] || "");
  });
  return str;
}
export const SettingsPartsFragmentDoc = gql`
    fragment SettingsParts on Settings {
  __typename
  brandName
  logo
  phoneDisplay
  email
  addressLine
  mapLink
  whatsappNumber
  whatsappShortLink
  footerCopyright
  chatEnabled
  chatWebhookUrl
  chatBotAvatar
  chatQuickReplies {
    __typename
    label
    question
  }
  carouselAutoplay
  showConsultBadge
  showDangerTape
}
    `;
export const HomeHeroPartsFragmentDoc = gql`
    fragment HomeHeroParts on HomeHero {
  __typename
  eyebrow
  heading
  headingHighlight
  subheading
  ctaLabel
  heroVideo
  tags
}
    `;
export const HomeProblemsPartsFragmentDoc = gql`
    fragment HomeProblemsParts on HomeProblems {
  __typename
  heading
  subheading
  items {
    __typename
    title
    text
  }
  tapeText
}
    `;
export const HomeAboutPartsFragmentDoc = gql`
    fragment HomeAboutParts on HomeAbout {
  __typename
  eyebrow
  heading
  text
  points
  photo
  badgeNumber
  badgeLabel
}
    `;
export const HomePortfolioIntroPartsFragmentDoc = gql`
    fragment HomePortfolioIntroParts on HomePortfolioIntro {
  __typename
  heading
  intro
  ctaLabel
}
    `;
export const HomeResultsPartsFragmentDoc = gql`
    fragment HomeResultsParts on HomeResults {
  __typename
  heading
  testimonials {
    __typename
    company
    name
    text
  }
}
    `;
export const NosotrosHeroPartsFragmentDoc = gql`
    fragment NosotrosHeroParts on NosotrosHero {
  __typename
  eyebrow
  heading
  headingHighlight
  text
  tags
}
    `;
export const NosotrosPillarsPartsFragmentDoc = gql`
    fragment NosotrosPillarsParts on NosotrosPillars {
  __typename
  heading
  subheading
  items {
    __typename
    title
    text
  }
}
    `;
export const NosotrosWorkStylePartsFragmentDoc = gql`
    fragment NosotrosWorkStyleParts on NosotrosWorkStyle {
  __typename
  heading
  items {
    __typename
    highlight
    text
  }
}
    `;
export const NosotrosBioPartsFragmentDoc = gql`
    fragment NosotrosBioParts on NosotrosBio {
  __typename
  heading
  text
  points
  ctaLabel
  photo
  badgeNumber
  badgeLabel
}
    `;
export const PortfolioHeroPartsFragmentDoc = gql`
    fragment PortfolioHeroParts on PortfolioHero {
  __typename
  eyebrow
  heading
  headingHighlight
  subheading
  tags
}
    `;
export const BlogHeroPartsFragmentDoc = gql`
    fragment BlogHeroParts on BlogHero {
  __typename
  eyebrow
  heading
  headingHighlight
  subheading
  toolsLabel
}
    `;
export const ContactHeroPartsFragmentDoc = gql`
    fragment ContactHeroParts on ContactHero {
  __typename
  heading
  paragraph1
  paragraph2
}
    `;
export const ContactPageCtaPartsFragmentDoc = gql`
    fragment ContactPageCtaParts on ContactPageCta {
  __typename
  heading
  subheading
}
    `;
export const ContactCtaPartsFragmentDoc = gql`
    fragment ContactCtaParts on ContactCta {
  __typename
  heading
  subheading
}
    `;
export const FeaturedTestimonialPartsFragmentDoc = gql`
    fragment FeaturedTestimonialParts on FeaturedTestimonial {
  __typename
  quote
  author
  ctaLabel
}
    `;
export const PrivacyPolicyPartsFragmentDoc = gql`
    fragment PrivacyPolicyParts on PrivacyPolicy {
  __typename
  eyebrow
  title
  subtitle
  lastUpdated
  contactEmail
  sections {
    __typename
    number
    title
    body
    bullets
    callout
  }
}
    `;
export const ProjectPartsFragmentDoc = gql`
    fragment ProjectParts on Project {
  __typename
  title
  category
  service
  image
  shortDescription
  featuredOnHome
  order
  caseImage
  objective
  story {
    __typename
    parrafo
  }
  benefits {
    __typename
    title
    text
  }
  closingQuestion
  closingSubtext
}
    `;
export const ToolCardPartsFragmentDoc = gql`
    fragment ToolCardParts on ToolCard {
  __typename
  title
  category
  logo
  logoBackground
  description
  aboutText
  order
}
    `;
export const SettingsDocument = gql`
    query settings($relativePath: String!) {
  settings(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...SettingsParts
  }
}
    ${SettingsPartsFragmentDoc}`;
export const SettingsConnectionDocument = gql`
    query settingsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: SettingsFilter) {
  settingsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...SettingsParts
      }
    }
  }
}
    ${SettingsPartsFragmentDoc}`;
export const HomeHeroDocument = gql`
    query homeHero($relativePath: String!) {
  homeHero(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...HomeHeroParts
  }
}
    ${HomeHeroPartsFragmentDoc}`;
export const HomeHeroConnectionDocument = gql`
    query homeHeroConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: HomeHeroFilter) {
  homeHeroConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...HomeHeroParts
      }
    }
  }
}
    ${HomeHeroPartsFragmentDoc}`;
export const HomeProblemsDocument = gql`
    query homeProblems($relativePath: String!) {
  homeProblems(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...HomeProblemsParts
  }
}
    ${HomeProblemsPartsFragmentDoc}`;
export const HomeProblemsConnectionDocument = gql`
    query homeProblemsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: HomeProblemsFilter) {
  homeProblemsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...HomeProblemsParts
      }
    }
  }
}
    ${HomeProblemsPartsFragmentDoc}`;
export const HomeAboutDocument = gql`
    query homeAbout($relativePath: String!) {
  homeAbout(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...HomeAboutParts
  }
}
    ${HomeAboutPartsFragmentDoc}`;
export const HomeAboutConnectionDocument = gql`
    query homeAboutConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: HomeAboutFilter) {
  homeAboutConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...HomeAboutParts
      }
    }
  }
}
    ${HomeAboutPartsFragmentDoc}`;
export const HomePortfolioIntroDocument = gql`
    query homePortfolioIntro($relativePath: String!) {
  homePortfolioIntro(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...HomePortfolioIntroParts
  }
}
    ${HomePortfolioIntroPartsFragmentDoc}`;
export const HomePortfolioIntroConnectionDocument = gql`
    query homePortfolioIntroConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: HomePortfolioIntroFilter) {
  homePortfolioIntroConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...HomePortfolioIntroParts
      }
    }
  }
}
    ${HomePortfolioIntroPartsFragmentDoc}`;
export const HomeResultsDocument = gql`
    query homeResults($relativePath: String!) {
  homeResults(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...HomeResultsParts
  }
}
    ${HomeResultsPartsFragmentDoc}`;
export const HomeResultsConnectionDocument = gql`
    query homeResultsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: HomeResultsFilter) {
  homeResultsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...HomeResultsParts
      }
    }
  }
}
    ${HomeResultsPartsFragmentDoc}`;
export const NosotrosHeroDocument = gql`
    query nosotrosHero($relativePath: String!) {
  nosotrosHero(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...NosotrosHeroParts
  }
}
    ${NosotrosHeroPartsFragmentDoc}`;
export const NosotrosHeroConnectionDocument = gql`
    query nosotrosHeroConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: NosotrosHeroFilter) {
  nosotrosHeroConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...NosotrosHeroParts
      }
    }
  }
}
    ${NosotrosHeroPartsFragmentDoc}`;
export const NosotrosPillarsDocument = gql`
    query nosotrosPillars($relativePath: String!) {
  nosotrosPillars(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...NosotrosPillarsParts
  }
}
    ${NosotrosPillarsPartsFragmentDoc}`;
export const NosotrosPillarsConnectionDocument = gql`
    query nosotrosPillarsConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: NosotrosPillarsFilter) {
  nosotrosPillarsConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...NosotrosPillarsParts
      }
    }
  }
}
    ${NosotrosPillarsPartsFragmentDoc}`;
export const NosotrosWorkStyleDocument = gql`
    query nosotrosWorkStyle($relativePath: String!) {
  nosotrosWorkStyle(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...NosotrosWorkStyleParts
  }
}
    ${NosotrosWorkStylePartsFragmentDoc}`;
export const NosotrosWorkStyleConnectionDocument = gql`
    query nosotrosWorkStyleConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: NosotrosWorkStyleFilter) {
  nosotrosWorkStyleConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...NosotrosWorkStyleParts
      }
    }
  }
}
    ${NosotrosWorkStylePartsFragmentDoc}`;
export const NosotrosBioDocument = gql`
    query nosotrosBio($relativePath: String!) {
  nosotrosBio(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...NosotrosBioParts
  }
}
    ${NosotrosBioPartsFragmentDoc}`;
export const NosotrosBioConnectionDocument = gql`
    query nosotrosBioConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: NosotrosBioFilter) {
  nosotrosBioConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...NosotrosBioParts
      }
    }
  }
}
    ${NosotrosBioPartsFragmentDoc}`;
export const PortfolioHeroDocument = gql`
    query portfolioHero($relativePath: String!) {
  portfolioHero(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PortfolioHeroParts
  }
}
    ${PortfolioHeroPartsFragmentDoc}`;
export const PortfolioHeroConnectionDocument = gql`
    query portfolioHeroConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PortfolioHeroFilter) {
  portfolioHeroConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PortfolioHeroParts
      }
    }
  }
}
    ${PortfolioHeroPartsFragmentDoc}`;
export const BlogHeroDocument = gql`
    query blogHero($relativePath: String!) {
  blogHero(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...BlogHeroParts
  }
}
    ${BlogHeroPartsFragmentDoc}`;
export const BlogHeroConnectionDocument = gql`
    query blogHeroConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: BlogHeroFilter) {
  blogHeroConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...BlogHeroParts
      }
    }
  }
}
    ${BlogHeroPartsFragmentDoc}`;
export const ContactHeroDocument = gql`
    query contactHero($relativePath: String!) {
  contactHero(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ContactHeroParts
  }
}
    ${ContactHeroPartsFragmentDoc}`;
export const ContactHeroConnectionDocument = gql`
    query contactHeroConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ContactHeroFilter) {
  contactHeroConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ContactHeroParts
      }
    }
  }
}
    ${ContactHeroPartsFragmentDoc}`;
export const ContactPageCtaDocument = gql`
    query contactPageCta($relativePath: String!) {
  contactPageCta(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ContactPageCtaParts
  }
}
    ${ContactPageCtaPartsFragmentDoc}`;
export const ContactPageCtaConnectionDocument = gql`
    query contactPageCtaConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ContactPageCtaFilter) {
  contactPageCtaConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ContactPageCtaParts
      }
    }
  }
}
    ${ContactPageCtaPartsFragmentDoc}`;
export const ContactCtaDocument = gql`
    query contactCta($relativePath: String!) {
  contactCta(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ContactCtaParts
  }
}
    ${ContactCtaPartsFragmentDoc}`;
export const ContactCtaConnectionDocument = gql`
    query contactCtaConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ContactCtaFilter) {
  contactCtaConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ContactCtaParts
      }
    }
  }
}
    ${ContactCtaPartsFragmentDoc}`;
export const FeaturedTestimonialDocument = gql`
    query featuredTestimonial($relativePath: String!) {
  featuredTestimonial(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...FeaturedTestimonialParts
  }
}
    ${FeaturedTestimonialPartsFragmentDoc}`;
export const FeaturedTestimonialConnectionDocument = gql`
    query featuredTestimonialConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: FeaturedTestimonialFilter) {
  featuredTestimonialConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...FeaturedTestimonialParts
      }
    }
  }
}
    ${FeaturedTestimonialPartsFragmentDoc}`;
export const PrivacyPolicyDocument = gql`
    query privacyPolicy($relativePath: String!) {
  privacyPolicy(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...PrivacyPolicyParts
  }
}
    ${PrivacyPolicyPartsFragmentDoc}`;
export const PrivacyPolicyConnectionDocument = gql`
    query privacyPolicyConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: PrivacyPolicyFilter) {
  privacyPolicyConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...PrivacyPolicyParts
      }
    }
  }
}
    ${PrivacyPolicyPartsFragmentDoc}`;
export const ProjectDocument = gql`
    query project($relativePath: String!) {
  project(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ProjectParts
  }
}
    ${ProjectPartsFragmentDoc}`;
export const ProjectConnectionDocument = gql`
    query projectConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ProjectFilter) {
  projectConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ProjectParts
      }
    }
  }
}
    ${ProjectPartsFragmentDoc}`;
export const ToolCardDocument = gql`
    query toolCard($relativePath: String!) {
  toolCard(relativePath: $relativePath) {
    ... on Document {
      _sys {
        filename
        basename
        hasReferences
        breadcrumbs
        path
        relativePath
        extension
      }
      id
    }
    ...ToolCardParts
  }
}
    ${ToolCardPartsFragmentDoc}`;
export const ToolCardConnectionDocument = gql`
    query toolCardConnection($before: String, $after: String, $first: Float, $last: Float, $sort: String, $filter: ToolCardFilter) {
  toolCardConnection(
    before: $before
    after: $after
    first: $first
    last: $last
    sort: $sort
    filter: $filter
  ) {
    pageInfo {
      hasPreviousPage
      hasNextPage
      startCursor
      endCursor
    }
    totalCount
    edges {
      cursor
      node {
        ... on Document {
          _sys {
            filename
            basename
            hasReferences
            breadcrumbs
            path
            relativePath
            extension
          }
          id
        }
        ...ToolCardParts
      }
    }
  }
}
    ${ToolCardPartsFragmentDoc}`;
export function getSdk(requester) {
  return {
    settings(variables, options) {
      return requester(SettingsDocument, variables, options);
    },
    settingsConnection(variables, options) {
      return requester(SettingsConnectionDocument, variables, options);
    },
    homeHero(variables, options) {
      return requester(HomeHeroDocument, variables, options);
    },
    homeHeroConnection(variables, options) {
      return requester(HomeHeroConnectionDocument, variables, options);
    },
    homeProblems(variables, options) {
      return requester(HomeProblemsDocument, variables, options);
    },
    homeProblemsConnection(variables, options) {
      return requester(HomeProblemsConnectionDocument, variables, options);
    },
    homeAbout(variables, options) {
      return requester(HomeAboutDocument, variables, options);
    },
    homeAboutConnection(variables, options) {
      return requester(HomeAboutConnectionDocument, variables, options);
    },
    homePortfolioIntro(variables, options) {
      return requester(HomePortfolioIntroDocument, variables, options);
    },
    homePortfolioIntroConnection(variables, options) {
      return requester(HomePortfolioIntroConnectionDocument, variables, options);
    },
    homeResults(variables, options) {
      return requester(HomeResultsDocument, variables, options);
    },
    homeResultsConnection(variables, options) {
      return requester(HomeResultsConnectionDocument, variables, options);
    },
    nosotrosHero(variables, options) {
      return requester(NosotrosHeroDocument, variables, options);
    },
    nosotrosHeroConnection(variables, options) {
      return requester(NosotrosHeroConnectionDocument, variables, options);
    },
    nosotrosPillars(variables, options) {
      return requester(NosotrosPillarsDocument, variables, options);
    },
    nosotrosPillarsConnection(variables, options) {
      return requester(NosotrosPillarsConnectionDocument, variables, options);
    },
    nosotrosWorkStyle(variables, options) {
      return requester(NosotrosWorkStyleDocument, variables, options);
    },
    nosotrosWorkStyleConnection(variables, options) {
      return requester(NosotrosWorkStyleConnectionDocument, variables, options);
    },
    nosotrosBio(variables, options) {
      return requester(NosotrosBioDocument, variables, options);
    },
    nosotrosBioConnection(variables, options) {
      return requester(NosotrosBioConnectionDocument, variables, options);
    },
    portfolioHero(variables, options) {
      return requester(PortfolioHeroDocument, variables, options);
    },
    portfolioHeroConnection(variables, options) {
      return requester(PortfolioHeroConnectionDocument, variables, options);
    },
    blogHero(variables, options) {
      return requester(BlogHeroDocument, variables, options);
    },
    blogHeroConnection(variables, options) {
      return requester(BlogHeroConnectionDocument, variables, options);
    },
    contactHero(variables, options) {
      return requester(ContactHeroDocument, variables, options);
    },
    contactHeroConnection(variables, options) {
      return requester(ContactHeroConnectionDocument, variables, options);
    },
    contactPageCta(variables, options) {
      return requester(ContactPageCtaDocument, variables, options);
    },
    contactPageCtaConnection(variables, options) {
      return requester(ContactPageCtaConnectionDocument, variables, options);
    },
    contactCta(variables, options) {
      return requester(ContactCtaDocument, variables, options);
    },
    contactCtaConnection(variables, options) {
      return requester(ContactCtaConnectionDocument, variables, options);
    },
    featuredTestimonial(variables, options) {
      return requester(FeaturedTestimonialDocument, variables, options);
    },
    featuredTestimonialConnection(variables, options) {
      return requester(FeaturedTestimonialConnectionDocument, variables, options);
    },
    privacyPolicy(variables, options) {
      return requester(PrivacyPolicyDocument, variables, options);
    },
    privacyPolicyConnection(variables, options) {
      return requester(PrivacyPolicyConnectionDocument, variables, options);
    },
    project(variables, options) {
      return requester(ProjectDocument, variables, options);
    },
    projectConnection(variables, options) {
      return requester(ProjectConnectionDocument, variables, options);
    },
    toolCard(variables, options) {
      return requester(ToolCardDocument, variables, options);
    },
    toolCardConnection(variables, options) {
      return requester(ToolCardConnectionDocument, variables, options);
    }
  };
}
import { createClient } from "tinacms/dist/client";
const generateRequester = (client) => {
  const requester = async (doc, vars, options) => {
    let url = client.apiUrl;
    if (options?.branch) {
      const index = client.apiUrl.lastIndexOf("/");
      url = client.apiUrl.substring(0, index + 1) + options.branch;
    }
    const data = await client.request({
      query: doc,
      variables: vars,
      url
    }, options);
    return { data: data?.data, errors: data?.errors, query: doc, variables: vars || {} };
  };
  return requester;
};
export const ExperimentalGetTinaClient = () => getSdk(
  generateRequester(
    createClient({
      url: "https://content.tinajs.io/2.4/content/8a7b8685-4514-4b1b-96f0-16741fa83f2e/github/main",
      queries
    })
  )
);
export const queries = (client) => {
  const requester = generateRequester(client);
  return getSdk(requester);
};
