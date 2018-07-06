# Poseidon 🔱🌊
> Like Neptune but different

## The problem
I would like to use AWS Neptune but still be able to run tests and develop locally without having to spin up separate instances of Neptune or using the same instance for local development, tests and production.

## The solution
Rebuild the interface on top of (an) existing database(s), probably an RDF store with a SPARQL API that can easily be proxied.

## Usage
NPM:
```
npm install -g poseidon
```

Docker (doesn't work yet):
```
docker run -p 8082:8082 knowledge-express/poseidon
```

## The implementation
The point is not to be as efficient as possible or to reimplement Neptune. The point is to be able to use this interchangeably with Neptune with regards to interface. As such, the implementation should cover the following:

### TODO
- [x] Status endpoint on `/status`
- [ ] SPARQL 1.1 API endpoint on `/sparql`
- [ ] Loader endpoint on `/loader` (PRs welcome)
- [ ] Gremlin endpoint on `/gremlin` (PRs welcome)
- [ ] Content negotiation (PRs welcome)
- [ ] Provide correct error codes and messages (PRs welcome)

## Supported backends
Maybe this is not relevant, since the use-case doesn't really care about performance. That being said, I'm not sure what possibilities there are and what (dis)advantages different stores have exactly, yet.
- [ ] Parliament
- [ ] Virtuoso
