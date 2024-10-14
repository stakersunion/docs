# Stakers Union Documentation

## Proposed Changes

To propose changes to the Stakers Union documentation, please submit a pull request to this repository. Reach out to the Governance Subcommittee Leader on Discord or by [email](mailto:governance@stakersunion.com).

### Adding Banner

Pull requests should include a banner referencing the name of the branch, this should be added to the `theme.config.tsx` file.

```
  banner: {
    key: 'branch-name',
    text: (
      <a
        href={'https://github.com/stakersunion/docs/compare/main...branch-name'}
        target={'_blank'}
      >
        📜 This is a proposal for <strong>'branch-name'</strong> | View changes →
      </a>
    ),
    dismissible: false,
  },
```
