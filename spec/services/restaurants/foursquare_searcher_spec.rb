describe Restaurants::FoursquareSearcher do
  describe '#search' do
    subject { Restaurants::FoursquareSearcher.new(query, location, 50) }

    context 'when the service receives empty fields' do
      let(:query) { nil }
      let(:location) { nil }

      it 'should not return a result' do
        expect(subject.search).to eq({})
      end
    end

    context 'when the service receives valid fields' do
      let(:query) { 'sandwich' }
      let(:location) { 'Cluj' }
      let(:provider) { double }
      let(:result) { double }

      before do
        allow(Foursquare2::Client).to receive(:new).and_return(provider)
      end

      it 'should return a result' do
        expect(provider).to receive(:search_venues)
          .with(near: location, query: query, limit: 50)
          .and_return(result)
        expect(subject.search).to be(result)
      end
    end
  end

  describe '#formatted_result' do
    subject { Restaurants::FoursquareSearcher.new(query, location) }
    let(:query) { 'sandwich' }
    let(:location) { 'Cluj' }
    let(:provider) { double }
    let(:result) { double }

    before do
      allow(Foursquare2::Client).to receive(:new).and_return(provider)
    end

    context 'when the service receives no options to format' do
      before do
        allow(provider).to receive(:search_venues).and_return({ venues: result })
      end

      it 'should return the whole search result' do
        expect(subject.formatted_result).to be(result)
      end
    end

    context 'when the service receives options to format' do
      let(:options) { [:location] }
      let(:name) { 'name' }
      let(:location) { double(Hash) }

      before do
        allow(provider).to receive(:search_venues)
          .and_return({ venues: [{ name: name, location: location }] })
      end

      it 'should return a result' do
        expect(subject.formatted_result(options)).to eq([{ location: location }])
      end
    end
  end
end
