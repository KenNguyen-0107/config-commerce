import { gql } from "graphql-request"

export const getHomePage = gql`
	query getHomePage {
		B2BHomePage {
			items {
				OGTitle
				OGImage {
					Url
				}
				Url
				Language {
					Name
					Link
					DisplayName
				}
			}
		}
	}
`