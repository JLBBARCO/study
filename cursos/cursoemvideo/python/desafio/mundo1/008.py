medida = float(input('Uma distância em metros: '))
km = medida * 0.001
hm = medida * 0.01
dm = medida * 0.1
dc = medida * 10
cm = medida * 100
mm = medida * 1000
print('A medida de {}km corresponde a {}hm, que por sua vez, é {}dm, que corresponde a {}m que é igual a {}dc, {:.0f}cm, e {:.0f}mm'.format(km, hm, dm, medida, dc, cm, mm))
