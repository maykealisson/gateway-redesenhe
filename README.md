## Gerando imagem

```bash
$ docker buildx build --platform=linux/arm64/v8 -t maykealisson/redesenhe-gateway:{VERSION} .
```

## Subindo image

```bash
$  docker push maykealisson/redesenhe-gateway:{VERSION}
```
