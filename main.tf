terraform {
  required_providers {
    aws = {
      source = "hashicorp/aws"
    }
    random = {
      source = "hashicorp/random"
    }
  }

  cloud {
    organization = "devdegany"

    workspaces {
      name = "gh-actions-demo"
    }
  }
}