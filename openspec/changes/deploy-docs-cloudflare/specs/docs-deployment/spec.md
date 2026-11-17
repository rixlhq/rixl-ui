# Docs Deployment

## Purpose

Make validated documentation changes available on the Cloudflare-hosted UI showcase without requiring a new npm package version.

## ADDED Requirements

### Requirement: Publish validated production docs

The system SHALL publish the static documentation build to Cloudflare project `ui` after CI succeeds on `main`, regardless of whether a library release is created.

#### Scenario: Main update without a package release

- **WHEN** a push to `main` passes CI without creating an npm release
- **THEN** the validated documentation artifact is deployed to `ui`

#### Scenario: Failed validation

- **WHEN** CI fails
- **THEN** the production documentation deployment does not run

### Requirement: Restrict production deployment

The system SHALL restrict production documentation deployment to pushes and manual workflow runs on `main`.

#### Scenario: Pull request validation

- **WHEN** a pull request runs CI, including one from a fork
- **THEN** CI builds documentation without deploying production

#### Scenario: Manual production retry

- **WHEN** the workflow is manually run on `main` and CI succeeds
- **THEN** the validated documentation artifact is deployed without requiring the npm publish input

#### Scenario: Manual run on another branch

- **WHEN** the workflow is manually run on a branch other than `main`
- **THEN** production documentation deployment does not run
